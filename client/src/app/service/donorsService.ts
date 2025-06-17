import { Injectable } from '@angular/core';
import { Donor } from '../domain/donor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DonorService {
    baseUrl: string = "https://localhost:5001/api/Donor";
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
    getDonorsDataFromServer(): Observable<Donor[]> {
        return this._http.get<Donor[]>(this.baseUrl, { headers: this.getHeaders() });
    }

    saveDonorToServer(donor: Donor): Observable<boolean> {
        return this._http.post<boolean>(this.baseUrl, donor, { headers: this.getHeaders() })
    }

    deleteDonorFromServer(donor: Donor) {
        return this._http.delete(`${this.baseUrl}/${donor.id}`, { headers: this.getHeaders() })
    }
    editDonorFromServer(donor: Donor) {
        return this._http.put(`${this.baseUrl}/${donor.id}`, donor, { headers: this.getHeaders() })
    }

    getOneFromServer(id: number): Observable<Donor> {
        return this._http.get<Donor>(`${this.baseUrl}/${id}`, { headers: this.getHeaders() })
    }
    post(donor: Donor): Observable<Donor> {
        return this._http.post<Donor>(this.baseUrl, donor, { headers: this.getHeaders() })
    }
    updateProduct(donor: Donor) {
        return this._http.put<Donor>(`${this.baseUrl}/${donor.id}`, donor, { headers: this.getHeaders() })
    }
    search(name: string, email: string, giftName: string): Observable<Donor[]> {
        return this._http.get<Donor[]>(`${this.baseUrl}/search?name=${name}&email=${email}&giftName=${giftName}`, { headers: this.getHeaders() })
    }


}