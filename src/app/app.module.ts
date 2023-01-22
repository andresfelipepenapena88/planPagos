import { DecimalPipe, registerLocaleData } from '@angular/common';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CopFormatPipe } from './pipes/cop-format.pipe';
import * as localeCO from '@angular/common/locales/es-CO';
registerLocaleData(localeCO.default);

@NgModule({
  declarations: [
    AppComponent,
    CopFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    DecimalPipe
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' },
    CopFormatPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
