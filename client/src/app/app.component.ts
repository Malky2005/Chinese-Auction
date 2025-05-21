import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css',
  animations: [
    trigger('animation', [
      state('start', style({ opacity: 1 })),
      state('end', style({ opacity: 0 })),
      transition('start <=> end', animate('300ms ease-in-out'))
])]
})
export class AppComponent {
  title = 'project';
}
