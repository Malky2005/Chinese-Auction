import { Injectable } from '@angular/core';
import { Donor } from '../domain/donor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DonorService {

    constructor(private _http: HttpClient) { }
    getDonorsDataFromServer(): Observable<Donor[]> {
        return this._http.get<Donor[]>("/api/donors")
    }

    saveDonorToServer(donor: Donor): Observable<boolean> {
        return this._http.post<boolean>("http://localhost:3000/api/donors", donor)
    }

    deleteDonorFromServer(donor: Donor) {
        return this._http.delete("http://localhost:3000/api/donors/" + donor.id)
    }
    editDonorFromServer(donor: Donor) {
        return this._http.put("http://localhost:3000/api/donors/" + donor.id, donor)
    }

    getOneFromServer(id: number): Observable<Donor> {
        return this._http.get<Donor>("http://localhost:3000/api/donors/" + id)
    }
    post(donor: Donor): Observable<Donor> {
        return this._http.post<Donor>("http://localhost:3000/api/donors", donor)
    }
    updateProduct(donor: Donor) {
        return this._http.put<Donor>("http://localhost:3000/api/donors/" + donor.id, donor)
    }
}