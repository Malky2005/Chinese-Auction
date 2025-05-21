import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { giftListModule } from './modules/gifts/gifts-list.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [AppModule, ServerModule,giftListModule,
    NoopAnimationsModule,],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
