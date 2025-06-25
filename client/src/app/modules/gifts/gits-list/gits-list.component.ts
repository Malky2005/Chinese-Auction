import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from '../../../domain/product';
import { ProductService } from '../../../service/productservice';
import * as XLSX from 'xlsx';
import { TicketService } from '../../../service/ticketService';


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
    userRole: string | null = localStorage.getItem('role');
    productDialog: boolean = false;

    products!: Product[];

    product: Product = new Product();
    showGiftTickets: boolean = false;
    showWinnerDetails: boolean = false;
    @Input()
    productName: string | undefined

    selectedProducts!: Product[] | null;

    dt: any = ''
    statuses!: any[];
    event: any;

    BuyersCountFilter: Number | undefined = undefined;
    donorFilter: string = '';
    giftNameFilter: string = '';

    constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService, private ticketService: TicketService) { }
    ngOnChanges(changes: SimpleChanges): void {
        throw new Error('Method not implemented.');
    }

    ngOnInit() {
        this.productService.getProductsDataFromServer().subscribe(data => {
            this.products = data
            this.products.forEach(product => {
                product.numOfTickets = product.tickets ? product.tickets.length : 0;
            });
        });
    }

    openNew() {
        this.product = new Product();
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.selectedProducts?.forEach(product => {
                    this.productService.deleteProductFromServer(product).subscribe(data => {
                        this.product = new Product();
                        this.productService.getProductsDataFromServer().subscribe(d => {
                            this.products = d
                            this.products.forEach(product => {
                                product.numOfTickets = product.tickets ? product.tickets.length : 0;
                            });
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
            message: 'Are you sure you want to delete ' + product.giftName + '?',
            header: 'Delete',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.productService.deleteProductFromServer(product).subscribe(data => {
                    this.product = new Product();
                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
                    this.productService.getProductsDataFromServer().subscribe(d => {
                        this.products = d
                        this.products.forEach(product => {
                            product.numOfTickets = product.tickets ? product.tickets.length : 0;
                        });
                    })
                })
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
    }
    filterGifts() {
        if (!this.products) {
            return [];
        }
        return this.products.filter(product => {
            const matchesName = product.giftName?.toLowerCase().includes(this.giftNameFilter.toLowerCase());
            const matchesDonorName = product.donor?.name?.toLowerCase().includes(this.donorFilter.toLowerCase());
            const matchesNumOfTickets = product.numOfTickets === this.BuyersCountFilter || this.BuyersCountFilter === null || this.BuyersCountFilter === undefined;

            return matchesName && matchesDonorName && matchesNumOfTickets;
        });
        // this.productService.searchProducts(this.BuyersCountFilter, this.donorFilter, this.giftNameFilter).subscribe(data => {
        //     this.products = data;
        //     this.products.forEach(product => {
        //         product.numOfTickets = product.tickets ? product.tickets.length : 0;
        //     });
        // })
    }
    saveProduct(product: Product) {
        if (this.product.giftName?.trim()) {
            if (product.id) {
                this.productService.updateProduct(product).subscribe(data => {
                    this.productService.getProductsDataFromServer().subscribe(d => {
                        this.products = d
                        this.products.forEach(product => {
                            product.numOfTickets = product.tickets ? product.tickets.length : 0;
                        });
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
                    })
                }, err => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'error update product', life: 3000 });
                    console.log(err);
                })
            }

            else
                if (this.findIndexByName(this.product.giftName) < 0) {
                    product.imageUrl = 'product-placeholder.svg';
                    this.productService.post(product).subscribe(data => {
                        this.productService.getProductsDataFromServer().subscribe(d => {
                            this.products = d
                            this.products.forEach(product => {
                                product.numOfTickets = product.tickets ? product.tickets.length : 0;
                            });
                        })
                    })

                    this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
                }
                else
                    alert(`this name is exist`)
            this.products = [...this.products];
            this.productDialog = false;
            this.product = new Product();
        }

    }

    findIndexById(id: number): number {
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
            if (this.products[i].giftName === name) {
                index = i;
                break;
            }
        }

        return index;
    }

    showTickets(product: Product) {
        this.product = product;
        this.showGiftTickets = true;
    }
    numOfTickets(product: Product) {
        return "show (" + (product.numOfTickets) + ") tickets";
    }
    raffle(product: Product) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to raffle ' + product.giftName + '?',
            header: 'raffle',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                if (!product.id) {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Product ID is missing', life: 3000 });
                    this.confirmationService.close();
                    return;
                }
                if (!product.tickets || product.tickets.length === 0) {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No tickets available for raffle', life: 3000 });
                    this.confirmationService.close();
                    return;
                }
                this.productService.raffle(product.id).subscribe(data => {
                    this.productService.getProductsDataFromServer().subscribe(d => {
                        this.products = d;
                        this.products.forEach(product => {
                            product.numOfTickets = product.tickets ? product.tickets.length : 0;
                        });
                        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Raffle completed successfully', life: 3000 });
                    });
                }, err => {
                    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to complete raffle', life: 3000 });
                    console.error(err);
                });
                this.confirmationService.close();
            },
            reject: () => {
                this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'Raffle was cancelled', life: 3000 });
                this.confirmationService.close();
            }
        });

    }
    showWinner(product: Product) {
        this.product = { ...product };
        console.log(product);

        this.showWinnerDetails = true;
    }
    exportWinnersToExcel() {
        const productWin = this.products.filter(product => product.winner);
        const sheetData: any[] = productWin.map(product => {
            return {
                Id: product.id,
                Name: product.giftName,
                Category: product.categoryName,
                Price: product.price,
                WinnerId: product.winner?.id,
                WinnerName: product.winner?.fullname,
                WinnerEmail: product.winner?.email,
                WinnerPhone: product.winner?.phone
            };
        });

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(sheetData);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Gifts');

        XLSX.writeFile(wb, 'Gifts.xlsx');
        // const htmlString = XLSX.utils.sheet_to_html(ws);

        // const newWindow = window.open('', '_blank');
        // newWindow?.document.write(htmlString);
        // newWindow?.document.close();
    }
    exportIncomesToExcel() {
        const sheetData: any[] = this.products.map(product => {
            return {
                Id: product.id,
                Name: product.giftName,
                Price: product.price,
                NumOfTickets: product.numOfTickets,
                total: (product.price || 0) * product.numOfTickets
            };
        });

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(sheetData);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Incomes');

        XLSX.writeFile(wb, 'Incomes.xlsx');
    }
    addToCart(product: Product) {
        this.ticketService.orderTicket(product.id || 0).subscribe(data => {
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Add gift to cart successfully', life: 3000 });
            // this.ticketService.getTicketsByGiftId(product.id || 0).subscribe(tickets => {
            //     product.tickets = tickets;
            //     product.numOfTickets = tickets.length;
            // });
        }, err => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add gift to cart', life: 3000 });
            console.error(err);
        })
    }

}