import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { giftListModule } from './modules/gifts/gifts-list.module';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PaymentModule } from './modules/Login/payment.module';
import { PurchacewModule } from './modules/purchase/purchace.module';
import { NavComponent } from './nav/nav.component';
import { NavModule } from './nav/nav.module';
import { ImportsModule } from './imports';
import { TagModule } from 'primeng/tag';
import { DataViewModule } from 'primeng/dataview';
import { DonorDetalesComponent } from './modules/donors/donor-detales/donor-detales.component';
import { DonorModule } from './modules/donors/donors.module';
import { PaymentRouterModule } from './modules/Login/payment-routing.module';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';



@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    ImportsModule,CardModule,PasswordModule,
    NoopAnimationsModule,
    BrowserAnimationsModule, 
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    InputTextModule,
    giftListModule,
    DropdownModule,DataViewModule,
    FormsModule,TagModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,PaymentModule,DonorModule,PurchacewModule,NavModule,PaymentRouterModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
