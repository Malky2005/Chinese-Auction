import { Component, inject } from '@angular/core';
import { ImportsModule } from '../../imports';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';
import { DataView } from 'primeng/dataview';
import { Tag } from 'primeng/tag';
import { signal } from '@angular/core';

@Component({
    selector: 'app-purchase',
    standalone: false,
    templateUrl: './purchase.component.html',
    styleUrl: './purchase.component.css',
    providers: [ProductService]
})
export class PurchaseComponent {
    products!: Product[];
    layout: any;
    dv: any = ''
    filteredData: Product[] = []
    showDetails: boolean = false;
    constructor(private productService: ProductService) { }

    ngOnInit() {
        this.productService.getProducts().then((data) => {
            this.products = Array.isArray(data) ? data.slice(0, 5) : []
            this.filteredData = [...this.products];
        }).catch(error => {
            console.error('Error loading products:', error);
            this.products = []
            this.filteredData = []
        });

    }
    filterGlobalSearch(event: Event) {
        const input = event.target as HTMLInputElement;
        const value = input.value.toLowerCase();
        if (!this.products || this.products.length === 0) {
            return;
        }
        this.filteredData = this.products.filter(item =>
            Object.values(item).some(val =>
                String(val).toLowerCase().includes(value)
            )
        );


    }
    buyTicket() {
        console.log(`buy`)
        this.showDetails = true
    }

}