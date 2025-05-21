import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Donor } from '../../../domain/donor';
import { DonorService } from '../../../service/donorsServise';
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

    dt: any=''
    statuses!: any[];
    event: any;
    showMyGifts: boolean = false

    constructor(private donorService: DonorService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit() {

        this.donorService.getDonorsDataFromServer().subscribe(data => {
            this.donors = data
        })
        this.dt=''

    }

    openNew() {
        this.donor = {};

        this.submitted = false;
        this.donorDialog = true;
    }

    deleteSelectedDonors() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected donors?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.donors = this.donors.filter((val) => !this.selectedDonors?.includes(val));
                this.selectedDonors = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Donor Deleted', life: 3000 });
            }
        });
    }

    editDonor(donor: Donor) {
        this.donor = { ...donor };
        this.donorDialog = true;
    }

    deleteDonor(donor: Donor) {
        console.log(`delete`)
        try {
            this.confirmationService.confirm({

                message: 'Are you sure you want to delete ' + donor.name + '?',
                header: 'Confirm',
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    console.log(`accept`)
                    this.donorService.deleteDonorFromServer(donor).subscribe({
                        next: (data) => {
                            console.log(`${donor.id} deleted`)
                            // this.donor = {};
                            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'donor Deleted', life: 3000 });
                            this.donorService.getDonorsDataFromServer().subscribe(d => {
                                console.log('Fetched donors:', d);
                                this.donors = d
                            })

                        }, error: (err) => {
                            console.log(`err`)
                        }
                    })

                }
            });
        }
        catch (err) {
            console.log(err)
        }
    }

    hideDialog() {
        this.donorDialog = false;
        this.submitted = false;
    }
    filterGlobalSearch(event: Event) {
        const input = event.target as HTMLInputElement;
        const value = input.value;
        if (this.dt) {
            this.dt.filterGlobal(value, 'contains');
        } else {
            // console.error(`'Table reference (dt) is not initialized.${this.dt}`);
        }
    }
    saveDonor(donor:Donor) {
        this.submitted = true;
        if (donor.name?.trim()) {
            if (donor.id) {
                this.donorService.updateProduct(donor).subscribe(data=>{
                    this.donorService.getDonorsDataFromServer().subscribe(d => {
                        this.donors = d
                        console.log(d)
                    })
                })
               
                this.donors[this.findIndexById(donor.id)] = this.donor;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'donor Updated', life: 3000 });
            } else
                if (this.findIndexByName(donor.name) < 0) {
                    donor.id=this.createId()
                    console.log(`'new' ${donor}`)
                //not working 
                    this.donorService.post(donor).subscribe(data=>{
                        this.donorService.getDonorsDataFromServer().subscribe(d => {
                            this.donors = d
                            console.log(d)
                        })
                    })
                
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'donor Created', life: 3000 });
                }
                else
                    alert(`this name is exist`)
            this.donors = [...this.donors]
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
    showGifts() {
        this.showMyGifts = true;
    }

}
