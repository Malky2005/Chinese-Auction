import { Component, Input } from '@angular/core';
import { Ticket } from '../../../domain/ticket';
import { Product } from '../../../domain/product';
import { TicketService } from '../../../service/ticketService';

@Component({
  selector: 'app-gift-tickets',
  standalone: false,
  
  templateUrl: './gift-tickets.component.html',
  styleUrl: './gift-tickets.component.css'
})
export class GiftTicketsComponent {
  @Input()
  tickets: Ticket[] | undefined = [];
}
