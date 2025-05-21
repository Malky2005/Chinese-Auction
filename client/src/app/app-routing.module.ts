import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home-component/home-component.component';
import { GitsListComponent } from './modules/gifts/gits-list/gits-list.component';
import { DonorListComponent } from './modules/donors/donor-list/donor-list.component';
import { PurchaseComponent } from './modules/purchase/purchase.component';
import { PaymentComponent } from './modules/Login/payment.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'gifts',component:GitsListComponent},
  {path:'donors',component:DonorListComponent},
  {path:'purchase',component:PurchaseComponent},
 
  { path: 'pay', loadChildren: () => import('./modules/Login/payment-routing.module').then(m => m.PaymentRouterModule) },

  { path: 'login', redirectTo: 'pay/login' },
  { path: '**', redirectTo: 'pay/signup' },
  {path:'**',component:ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
