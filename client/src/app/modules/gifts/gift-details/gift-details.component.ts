import { Component, EventEmitter, Input, Output } from '@angular/core';
import { createProduct, Product } from '../../../domain/product';

@Component({
  selector: 'app-gift-details',
  standalone: false,
  
  templateUrl: './gift-details.component.html'
})
export class GiftDetailsComponent {
  @Input()
  product: Product = createProduct({ categoryName: 'Accessories' });
  @Output()
  onSaveGift: EventEmitter<Product> = new EventEmitter()
  submitted: boolean = false;
  @Output()
  hide: EventEmitter<boolean> = new EventEmitter()

  hideDialog() {
    this.submitted = false;
    this.hide.emit();
  }
  saveProduct() {
    this.submitted=true
    if (!this.product.giftName || !this.product.price || !this.product.donor) {
      return; 
    }
    this.submitted = false;
    this.onSaveGift.emit(this.product)
  }


}
