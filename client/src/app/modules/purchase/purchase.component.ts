import { Component, inject } from '@angular/core';
import { ImportsModule } from '../../imports';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';
import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { signal } from '@angular/core';
import { Ticket } from '../../domain/ticket';
import { TicketService } from '../../service/ticketService';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-purchase',
    standalone: false,
    templateUrl: './purchase.component.html',
    styleUrl: './purchase.component.css',
    providers: [ProductService, MessageService]
})
export class PurchaseComponent {
    tickets: Ticket[] = [];
    //products!: Product[];
    layout: any;
    dv: any = ''
    filteredData: Ticket[] = []
    showDetails: boolean = false;
    constructor(private ticketService: TicketService, private messageService: MessageService) { }

    ngOnInit() {
        this.ticketService.getAllPendingTicketsByUser().subscribe((data) => {
            this.tickets = data;
            this.filteredData = [...this.tickets];
        }, (error => {
            console.error('Error loading tickets:', error);
            this.tickets = []
            this.filteredData = []
        }));

    }
    filterGlobalSearch(event: Event) {
        const input = event.target as HTMLInputElement;
        const value = input.value.toLowerCase();
        if (!this.tickets || this.tickets.length === 0) {
            return;
        }
        this.filteredData = this.tickets.filter(item =>
            item.gift?.giftName?.toLowerCase().includes(value)
        );
    }
    buyTicket(ticket: Ticket) {
        this.ticketService.pay(ticket.id).subscribe(data => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'buyed gift succesfully', life: 3000 });
            this.ticketService.getAllPendingTicketsByUser().subscribe((data) => {
                this.tickets = data;
                this.filteredData = [...this.tickets];
            }, (error => {
                console.error('Error loading tickets:', error);
                this.tickets = []
                this.filteredData = []
            }));

        }, err => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error buyung gift', life: 3000 });
            console.error('Error buying ticket:', err);
        })
    }
    deleteTicket(ticket: Ticket) {
        this.ticketService.delete(ticket.id).subscribe(data => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Deleted ticket', life: 3000 });
            this.tickets = this.tickets.filter(t => t.id !== ticket.id);
            this.filteredData = [...this.tickets];
        }, err => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting ticket', life: 3000 });
            console.error('Error deleting ticket:', err);
        })
    }
}