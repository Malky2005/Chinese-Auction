
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportsModule } from '../../imports';  // אם יש לך מודול נוסף
import { PurchaseComponent } from './purchase.component'
import { ProductService } from '../../service/productservice';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

import { RatingModule } from 'primeng/rating';
import { TicketDetatilsComponent } from './ticket-detatils/ticket-detatils.component';
import { TicketService } from '../../service/ticketService';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [PurchaseComponent, TicketDetatilsComponent],
  imports: [DataViewModule,TableModule, 
    ButtonModule, TagModule, CommonModule,RatingModule,ImportsModule, ToastModule],
    providers: [ProductService, TicketService, MessageService],
  exports: [PurchaseComponent, TicketDetatilsComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PurchacewModule { }