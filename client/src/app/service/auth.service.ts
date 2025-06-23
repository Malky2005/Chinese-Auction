import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userRoleSubject = new BehaviorSubject<string | null>(this.getStoredRole());
  userRole$ = this.userRoleSubject.asObservable();

  setUserRole(role: string | null) {
    if (typeof window !== 'undefined') {
      if (role !== null) {
        localStorage.setItem('role', role);
      }
      this.userRoleSubject.next(role);
    }
  }

  private getStoredRole(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('role');
    }
    return null;
  }
}
