import { Component } from '@angular/core';
import { TicketService } from '../../../service/ticketService';
import { Ticket } from '../../../domain/ticket';

@Component({
  selector: 'app-ticket-detatils',
  standalone: false,
  
  templateUrl: './ticket-detatils.component.html',
})
export class TicketDetatilsComponent {
  tickets: Ticket[] = [];

  constructor(private ticketService: TicketService){}
  ngOnInit() {
    this.ticketService.getAllPaidTicketsByUser().subscribe((data) => {
      console.log(data);
      
      this.tickets = data;
    }, (error => {
      console.error('Error loading tickets:', error);
      this.tickets = [];
    }));
  }
}
