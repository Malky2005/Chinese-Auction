import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DonorService } from '../../../service/donorsService';
import { ProductService } from '../../../service/productservice';
import { Donor } from '../../../domain/donor';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';

@Component({
  selector: 'app-donor-detales',
  standalone: false,

  templateUrl: './donor-detales.component.html',
  styleUrl: './donor-detales.component.css'
})
export class DonorDetalesComponent {
  @Input()
  donor: Donor = {};
  @Output()
  onSaveDonor: EventEmitter<Donor> = new EventEmitter()
  submitted: boolean = false;
  @Output()
  hide: EventEmitter<boolean> = new EventEmitter()

  hideDialog() {
    this.submitted = false;
    this.hide.emit();
  }
  saveDonor() {
    this.submitted=true
    if (!this.donor.name || !this.donor.email) {
      return; 
    }
    this.onSaveDonor.emit(this.donor)
    this.submitted = false;
  }


}
