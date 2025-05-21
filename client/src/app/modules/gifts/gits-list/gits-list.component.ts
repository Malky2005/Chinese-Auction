import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { createProduct, Product } from '../../../domain/product';
import { ProductService } from '../../../service/productservice';


@Component({
    selector: 'app-gits-list',
    standalone: false,
    templateUrl: './gits-list.component.html',
    providers: [MessageService, ConfirmationService, ProductService],
    styles: [
        `:host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }`
    ]
})
export class GitsListComponent implements OnInit {
    productDialog: boolean = false;

    products!: Product[];

    product: Product = createProduct({ category: 'Accessories' });
    @Input()
    productName: string | undefined

    selectedProducts!: Product[] | null;

    submitted: boolean = false;
    dt: any=''
    statuses!: any[];
    event: any;


    constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) { }
    ngOnChanges(changes: SimpleChanges): void {
        throw new Error('Method not implemented.');
    }

    ngOnInit() {

        this.productService.getProductsDataFromServer().subscribe(data => {
            this.products = data
        })
        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    openNew() {
        this.product = createProduct({});

        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.selectedProducts?.forEach(product => {
                    this.productService.deleteProductFromServer(product).subscribe(data => {
                        this.product = createProduct();
                        this.productService.getProductsDataFromServer().subscribe(d => {
                            this.products = d
                        })
                    })
                })
                this.selectedProducts = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productService.deleteProductFromServer(product).subscribe(data => {
                    this.product = createProduct();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
                    this.productService.getProductsDataFromServer().subscribe(d => {
                        this.products = d
                        console.log(d)
                    })
                })
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
    filterGlobalSearch(event: Event) {
        const input = event.target as HTMLInputElement;
        const value = input.value;
        this.dt.filterGlobal(value, 'contains');
    }
    saveProduct(product: Product) {
        this.submitted = true;
        if (this.product.name?.trim()) {
            if (product.id) {
                this.productService.updateProduct(product).subscribe(data => {
                    this.productService.getProductsDataFromServer().subscribe(d => {
                        this.products = d
                        console.log(d)
                    })
                })
                this.products[this.findIndexById(product.id)] = product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }

            else
                if (this.findIndexByName(this.product.name) < 0) {
                    product.id = this.createId();
                    product.image = 'product-placeholder.svg';
                    this.productService.post(product).subscribe(data => {
                        this.productService.getProductsDataFromServer().subscribe(d => {
                            this.products = d
                            console.log(d)
                        })
                    })

                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                }
                else
                    alert(`this name is exist`)
            this.products = [...this.products];
            this.productDialog = false;
            this.product = createProduct({});
        }

    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    findIndexByName(name: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].name === name) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warning';
            case 'OUTOFSTOCK':
                return 'danger';
            default: return undefined
        }
    }
}