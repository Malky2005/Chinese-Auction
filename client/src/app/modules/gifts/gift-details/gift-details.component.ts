import { Component, EventEmitter, Input, Output } from '@angular/core';
import { createProduct, Product } from '../../../domain/product';
import { DonorService } from '../../../service/donorsService';
import { CategoryService } from '../../../service/categoryService';
import { Category } from '../../../domain/category';
import { Donor } from '../../../domain/donor';

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

  categories: Category[] = [];
  donors: Donor[] = [];
  constructor(private _donorService: DonorService, private _categoryService: CategoryService) {
    _categoryService.get().subscribe(data => {
      this.categories = data;
    }, (err) => {
      console.error(`Failed to load categories: ${err}`);
    })
    _donorService.getDonorsDataFromServer().subscribe(data => {
      this.donors = data;
    }, (err) => {
      console.error(`Failed to load donors: ${err}`);
    })
  }
  hideDialog() {
    this.submitted = false;
    this.hide.emit();
  }
  saveProduct() {
    this.submitted=true
    console.log(this.product);
    
    if (!this.product.giftName || !this.product.price || !this.product.donor || !this.product.categoryId) {
      return; 
    }
    this.submitted = false;
    this.onSaveGift.emit(this.product)
  }


}
