import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../domain/user';
import { Token } from '../domain/token';

@Injectable()
export class UserService {
    baseUrl: string = "https://localhost:5001/api/User/"
    token: string = ""
    constructor(private _http: HttpClient) { }

    post(user: User): Observable<User> {
        return this._http.post<User>(this.baseUrl + "register", user)
    }
    usernameExist(username: string): Observable<boolean> {
        return this._http.get<boolean>(this.baseUrl + username)
    }
    login(username: string, password: string): Observable<Token> {
        return this._http.post<Token>(this.baseUrl + "login/", { username, password })
    }
}