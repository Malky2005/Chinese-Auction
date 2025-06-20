import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DialogModule } from "primeng/dialog";
import { ToastModule } from "primeng/toast";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { RatingModule } from "primeng/rating";
import { OrderListModule } from "primeng/orderlist";
import { RadioButtonModule } from "primeng/radiobutton";
import { ToolbarModule } from "primeng/toolbar";
import { DonorListComponent } from "./donor-list/donor-list.component";
import { DonorDetalesComponent } from "./donor-detales/donor-detales.component";
import { DonorService } from "../../service/donorsService";
import { InputTextModule } from "primeng/inputtext";
import { CheckboxModule } from "primeng/checkbox";
import { DonorGiftListComponent } from './donor-gift-list/donor-gift-list.component';


@NgModule({
    declarations: [DonorListComponent, DonorDetalesComponent, DonorGiftListComponent],
    providers: [DonorService, ConfirmationService],
    imports: [CommonModule, FormsModule, DialogModule, ButtonModule, TableModule, ReactiveFormsModule, FormsModule, RadioButtonModule,
        ToastModule, DropdownModule,
        InputNumberModule,
        RatingModule, ToolbarModule,
        InputTextModule,

        ConfirmDialogModule,
        CheckboxModule],
    exports: [DonorListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DonorModule { }