import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-nav',
    standalone: false,

    templateUrl: './nav.component.html',
    styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
    items: MenuItem[] | undefined;

    constructor(private router: Router, private authService: AuthService) { }

    ngOnInit() {
        this.authService.userRole$.subscribe(role => {
            this.updateMenuItems(role);
        });
    }
    updateMenuItems(role: string | null) {
        if (role === 'ADMIN') {
            this.items = [
                {
                    label: 'Home',
                    icon: 'pi pi-home',
                    route: '/home'
                },
                {
                    label: 'Sign Out',
                    icon: 'pi pi-sign-out',
                    command: () => this.signOut()
                },
                {
                    label: 'Gifts',
                    icon: 'pi pi-gift',
                    command: () => {
                        this.router.navigate(['/gifts']);
                    }
                },
                {
                    label: 'Donors',
                    icon: 'pi pi-users',
                    command: () => {
                        this.router.navigate(['/donors']);
                    }
                },
            ];
        } else if (role === 'USER') {
            this.items = [
                {
                    label: 'Home',
                    icon: 'pi pi-home',
                    route: '/home'
                },
                {
                    label: 'Sign Out',
                    icon: 'pi pi-sign-out',
                    command: () => this.signOut()
                },
                {
                    label: 'Gifts',
                    icon: 'pi pi-gift',
                    command: () => {
                        this.router.navigate(['/gifts']);
                    }
                },
                {
                    label: 'My Tickets',
                    icon: 'pi pi-ticket',
                    command: () => {
                        this.router.navigate(['/tickets']);
                    }
                },
                {
                    label: 'cart',
                    icon: 'pi pi-shopping-cart',
                    command: () => {
                        this.router.navigate(['/purchase']);
                    }
                }
            ];
        } else {
            this.items = [
                {
                    label: 'Home',
                    icon: 'pi pi-home',
                    route: '/home'
                },
                {
                    label: 'Sign In',
                    icon: 'pi pi-sign-in',
                    items: [
                        {
                            label: 'Sign In',
                            route: '/login/signin'
                        },
                        {
                            label: 'Sign Up',
                            route: '/login/signup'
                        }
                    ]
                },
                {
                    label: 'Gifts',
                    icon: 'pi pi-gift',
                    command: () => {
                        this.router.navigate(['/gifts']);
                    }
                }
            ];
        }
    }
    signOut() {
        this.authService.setUserRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        this.router.navigate(['/login/signin']);
    }
}


