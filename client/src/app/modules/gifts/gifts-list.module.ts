import { CommonModule } from "@angular/common";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductService } from "../../service/productservice";
import { GitsListComponent } from "./gits-list/gits-list.component";
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
import { GiftDetailsComponent } from "./gift-details/gift-details.component";
import { InputTextModule } from "primeng/inputtext";
import { CategoryService } from "../../service/categoryService";
import { DonorService } from "../../service/donorsService";
import { GiftTicketsComponent } from './gift-tickets/gift-tickets.component';
import { TicketService } from "../../service/ticketService";
import { GiftWinnerDetailsComponent } from './gift-winner-details/gift-winner-details.component';
import { CardModule } from "primeng/card";


@NgModule({
    declarations: [GitsListComponent, GiftDetailsComponent, GiftTicketsComponent, GiftWinnerDetailsComponent],
    providers: [ProductService, ConfirmationService, CategoryService, DonorService, TicketService],
    imports: [CommonModule, FormsModule, DialogModule, ButtonModule, TableModule, ReactiveFormsModule, FormsModule, RadioButtonModule,
        ToastModule, DropdownModule,
        InputNumberModule,
        RatingModule, ToolbarModule,
        InputTextModule,
        ConfirmDialogModule,
        CardModule],
    exports: [GitsListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class giftListModule { }