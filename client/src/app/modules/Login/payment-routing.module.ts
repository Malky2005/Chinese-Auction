import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ExistingUserComponent } from "./existing-user/existing-user.component";
import { NewUserComponent } from "./new-user/new-user.component";

const routes=[
    {path:'signin',component:ExistingUserComponent},
    {path:'signup',component:NewUserComponent},
    { path: '**', redirectTo: 'signin' }
]
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class PaymentRouterModule{}