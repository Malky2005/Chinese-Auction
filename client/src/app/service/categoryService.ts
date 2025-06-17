import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../domain/category';

@Injectable()
export class CategoryService {
    baseUrl: string = "https://localhost:5001/api/Category/";
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

    get(): Observable<Category[]>{
        return this._http.get<Category[]>(this.baseUrl);
    }
    getById(id: number): Observable<Category> {
        return this._http.get<Category>(this.baseUrl + id);
    }
    post(name: string){
        return this._http.post(this.baseUrl , {name}, { headers: this.getHeaders() });
    }
    delete(id: number){
        return this._http.delete(this.baseUrl+id, { headers: this.getHeaders() });
    }
    put(category:Category){
        return this._http.put(this.baseUrl + category.id, category, { headers: this.getHeaders() });
    }
}