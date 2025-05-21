import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { NavComponent } from "./nav.component";
import { Router } from "@angular/router";
import { ImportsModule } from "../imports";

@NgModule({
  declarations: [NavComponent],
  imports: [
    ImportsModule
  ],
  providers: [Router],
  exports: [NavComponent], 
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class NavModule {}