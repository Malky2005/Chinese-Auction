import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userRole = this.getUserRole(); 

    if (userRole === 'ADMIN') {
      return true;
    }

    if (userRole === 'USER') {
      const requestedRoute = state.url;
      if (requestedRoute === '/gifts' || requestedRoute === '/purchase') {
        return true;
      }
    }

    this.router.navigate(['login/signin']); 
    return false;
  }

  private getUserRole(): string | null {
    return localStorage.getItem('role'); 
  }
}
