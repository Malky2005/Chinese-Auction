import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav',
  standalone: false,
  
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
      this.items = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            route: '/home'
           
        },
          {
              label: 'login',
              icon: 'pi pi-link',
              items: [
                  {
                      label: 'Login',
                       route: '/login'
                  },
                  {
                      label: 'Sign Up',
                      route: '/pay'
                  }
              ]
          },
          {
              label: 'Gifts',
              icon: 'pi pi-link',
              command: () => {
                  this.router.navigate(['/gifts']);
              }
          },
          {
            label: 'Donors',
            icon: 'pi pi-link',
            command: () => {
                this.router.navigate(['/donors']);
            }
        },
        {
          label: 'Buy Gifts',
          icon: 'pi pi-link',
          command: () => {
              this.router.navigate(['/purchase']);
          }
      }
      ];
  }
}


