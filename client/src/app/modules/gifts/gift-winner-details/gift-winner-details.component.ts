import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../domain/user';

@Component({
  selector: 'app-gift-winner-details',
  standalone: false,
  
  templateUrl: './gift-winner-details.component.html',
  styleUrl: './gift-winner-details.component.css'
})
export class GiftWinnerDetailsComponent implements OnInit {
  @Input()
  winner: User| undefined;
  ngOnInit() {
    console.log(this.winner);
  }
  constructor(){
    console.log(this.winner);
  }
}
