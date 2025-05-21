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
      this.productService.getProducts().then((data) => (this.products = data.slice(0, 5)));
  }

  getSeverity (product: Product) {
      switch (product.inventoryStatus) {
          case 'INSTOCK':
              return 'success';

          case 'LOWSTOCK':
              return 'warning';

          case 'OUTOFSTOCK':
              return 'danger';

          default:
              return undefined;
      }
  };
}
