import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Donor } from '../../../domain/donor';
import { DonorService } from '../../../service/donorsService';
import { ToolbarModule } from "primeng/toolbar";
@Component({
    selector: 'app-donor-list',
    standalone: false,
    providers: [MessageService, ConfirmationService, DonorService],
    templateUrl: './donor-list.component.html',
    styleUrl: './donor-list.component.css'
})

export class DonorListComponent implements OnInit {
    donorDialog: boolean = false;

    donors!: Donor[];

    donor: Donor = {}
    @Input()
    donorName: string | undefined

    selectedDonors!: Donor[] | null;

    submitted: boolean = false;

    dt: any = ''
    statuses!: any[];
    event: any;
    showMyGifts: boolean = false

    nameFilter: string = '';
    emailFilter: string = '';
    giftNameFilter: string = '';

    constructor(private donorService: DonorService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {
        this.loadDonors();
    }

    loadDonors() {
        this.donorService.getDonorsDataFromServer().subscribe(data => {
            this.donors = data;
        });
    }

    filterDonors() {
        if (!this.donors) {
            return []; 
        }
        return this.donors.filter(donor => {
            const matchesName = donor.name?.toLowerCase().includes(this.nameFilter.toLowerCase());
            const matchesEmail = donor.email?.toLowerCase().includes(this.emailFilter.toLowerCase());
            const matchesGiftName = donor.gifts?.some(gift => gift.giftName?.toLowerCase().includes(this.giftNameFilter.toLowerCase())) || false;

            return matchesName && matchesEmail && matchesGiftName;
        });
        // await this.donorService.search(this.nameFilter, this.emailFilter, this.giftNameFilter).subscribe(data => {
        //     this.donors = data;
        // }, err => {
        //     console.error('Search error:', err);
        //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not search donors', life: 3000 });
        // });
    }

    deleteDonor(donor: Donor) {
        this.confirmationService.confirm({
            message: `Are you sure you want to delete ${donor.name}?`,
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                console.log("1");

                this.donorService.deleteDonorFromServer(donor).subscribe({
                    next: () => {
                        console.log("2");
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Donor Deleted', life: 3000 });
                        this.loadDonors(); // Reload donors after deletion
                    },
                    error: (err) => {
                        console.log("3");
                        console.error('Delete error:', err);
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Could not delete donor', life: 3000 });
                    }
                });
            }
        });
    }

    rowClass(donor: Donor) {
        return { '!bg-primary !text-primary-contrast': donor.showMe === false };
    }

    openNew() {
        this.donor = {};

        this.submitted = false;
        this.donorDialog = true;
    }

    editDonor(donor: Donor) {
        this.donor = { ...donor };
        this.donorDialog = true;
    }


    hideDialog() {
        this.donorDialog = false;
        this.submitted = false;
    }
    saveDonor(donor: Donor) {
        this.submitted = true;
        if (donor.name?.trim()) {
            if (donor.id) {
                this.donorService.updateProduct(donor).subscribe(data => {
                    this.donorService.getDonorsDataFromServer().subscribe(d => {
                        this.donors = d
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'donor Updated', life: 3000 });
                    })
                }, err => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'error update donor', life: 3000 });
                    console.log(err);
                })
            } else
                if (this.findIndexByName(donor.name) < 0) {
                    this.donorService.post(donor).subscribe(data => {
                        this.donorService.getDonorsDataFromServer().subscribe(d => {
                            this.donors = d
                            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'donor Created', life: 3000 });
                        })
                    }, err => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'error createing donor', life: 3000 });
                        console.log(err);
                    })

                }
                else
                    alert(`this name is exist`)
            this.donorDialog = false
            this.donor = {}
        }

    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.donors.length; i++) {
            if (this.donors[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    findIndexByName(name: string): number {
        let index = -1;
        for (let i = 0; i < this.donors.length; i++) {
            if (this.donors[i].name === name) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    showGifts(donor: Donor) {
        this.donor = donor;
        this.showMyGifts = true;
    }

}
