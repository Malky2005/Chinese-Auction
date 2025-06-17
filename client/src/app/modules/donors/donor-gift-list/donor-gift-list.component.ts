import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../domain/product';

@Component({
  selector: 'app-donor-gift-list',
  standalone: false,
  
  templateUrl: './donor-gift-list.component.html',
  styleUrl: './donor-gift-list.component.css'
})
export class DonorGiftListComponent {
  @Input()
  products: Product[] = [];
}
