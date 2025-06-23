import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home-component/home-component.component';
import { GitsListComponent } from './modules/gifts/gits-list/gits-list.component';
import { DonorListComponent } from './modules/donors/donor-list/donor-list.component';
import { PurchaseComponent } from './modules/purchase/purchase.component';
import { PaymentComponent } from './modules/Login/payment.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'gifts', component: GitsListComponent, canActivate: [AuthGuard] },
  { path: 'donors', component: DonorListComponent, canActivate: [AuthGuard] },
  { path: 'purchase', component: PurchaseComponent, canActivate: [AuthGuard] },
  { path: 'login', loadChildren: () => import('./modules/Login/payment-routing.module').then(m => m.PaymentRouterModule)},
  { path: 'signin', redirectTo: 'login/signin' },
  { path: 'signup', redirectTo: 'login/signup' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
