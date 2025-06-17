
import { Injectable } from '@angular/core';
import { createProduct, Product } from '../domain/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
    baseUrl: string = "https://localhost:5001/api/Gifts";
    constructor(private _http: HttpClient) { }
    getHeaders(): HttpHeaders {
        let token: string | null = null;

        if (typeof window !== 'undefined') {
            token = localStorage.getItem('token');
        }

        const headers = new HttpHeaders({
            'Authorization': token ? `Bearer ${token}` : ''
        });
        return headers;
    }

    getProductsDataFromServer(): Observable<Product[]> {
        return this._http.get<Product[]>(this.baseUrl)
    }
    searchProducts(buyerCount: Number | undefined, donorName: string | undefined, giftName: string | undefined): Observable<Product[]> {
        let url = `${this.baseUrl}/search?`;
        if (buyerCount !== undefined && buyerCount != null) {
            url += `buyerCount=${buyerCount}&`;
        }
        if (donorName !== undefined && donorName !== null && donorName.trim() !== '') {
            url += `donorName=${donorName}&`;
        }
        if (giftName !== undefined && giftName !== null && giftName.trim() !== '') {
            url += `giftName=${giftName}`;
        }
        return this._http.get<Product[]>(url);
    }

    deleteProductFromServer(product: Product) {
        console.log(`Attempting to delete product with ID: ${product.id}`);
        return this._http.delete(`${this.baseUrl}/${product.id}`, { headers: this.getHeaders() });
    }

    getOneFromServer(id: number): Observable<Product> {
        return this._http.get<Product>(`${this.baseUrl}/${id}`)
    }

    post(product: Product): Observable<Product> {
        return this._http.post<Product>(this.baseUrl, {
            giftName: product.giftName,
            price: product.price,
            donorId: product.donor?.id,
            categoryId: product.categoryId,
            imageUrl: product.imageUrl,
            winnerId: product.winner?.id,
            details: product.details
        }, { headers: this.getHeaders() })
    }
    updateProduct(product: Product) {
        console.log(product);
        return this._http.put<Product>(`${this.baseUrl}/${product.id}`,
            {
                giftName: product.giftName,
                price: product.price,
                donorId: product.donor?.id,
                categoryId: product.categoryId,
                imageUrl: product.imageUrl,
                winnerId: product.winner?.id,
                details: product.details
            }, { headers: this.getHeaders() })
    }
};