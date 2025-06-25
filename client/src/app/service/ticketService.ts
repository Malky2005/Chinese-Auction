import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from '../domain/ticket';

@Injectable()
export class TicketService {
    baseUrl: string = "https://localhost:5001/api/Ticket/";
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

    getAllPaidTickets(): Observable<Ticket[]>{
        return this._http.get<Ticket[]>(this.baseUrl, { headers: this.getHeaders() });
    }
    orderTicket(giftId: number){
        return this._http.post(this.baseUrl, {giftId}, { headers: this.getHeaders() });
    }
    getAllPaidTicketsByUser(): Observable<Ticket[]> {
        return this._http.get<Ticket[]>(this.baseUrl + "paid", { headers: this.getHeaders() });
    }
    getAllPendingTicketsByUser(): Observable<Ticket[]>{
        return this._http.get<Ticket[]>(this.baseUrl + "pending", { headers: this.getHeaders() });
    }
    getById(id: number): Observable<Ticket> {
        return this._http.get<Ticket>(this.baseUrl+id, { headers: this.getHeaders() });
    }
    delete(id: number){
        return this._http.delete(this.baseUrl+id, { headers: this.getHeaders() });
    }
    pay(id: number){
        return this._http.put(this.baseUrl +"pay/" + id, {}, { headers: this.getHeaders() });
    }
    getTicketsByGiftId(giftId: number): Observable<Ticket[]> {
        return this._http.get<Ticket[]>(this.baseUrl + "byGift/" + giftId, { headers: this.getHeaders() });
    }
}