import { Component } from '@angular/core';
import { Product } from '../domain/product';
import { ProductService } from '../service/productservice';

@Component({
  selector: 'app-buy-gifts',
  standalone: false,
  
  templateUrl: './buy-gifts.component.html',
  styleUrl: './buy-gifts.component.css'
})
export class BuyGiftsComponent {
  products!: Product[];

  constructor(private productService: ProductService) {}

  ngOnInit() {
      this.productService.getProductsDataFromServer()
      .subscribe((data) => (this.products = data.slice(0, 5)));
  }

}
