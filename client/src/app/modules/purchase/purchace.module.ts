
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



@NgModule({
  declarations: [PurchaseComponent, TicketDetatilsComponent],
  imports: [DataViewModule, ButtonModule, TagModule, CommonModule,RatingModule,ImportsModule],
    providers: [ProductService],
  exports: [PurchaseComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class PurchacewModule { }