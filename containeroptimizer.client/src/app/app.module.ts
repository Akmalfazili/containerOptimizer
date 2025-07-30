import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule, NgxMatNativeDateModule, NgxMatDatepickerActions, NgxMatDatepickerApply } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { UploadComponent } from './upload/upload.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, BrowserAnimationsModule,
    MatButtonModule, MatIconModule, MatToolbarModule,
    ReactiveFormsModule, AngularMaterialModule, AppRoutingModule,
    NgxMatTimepickerModule, NgxMatDatetimePickerModule, MatDatepickerModule,
    NgxMatMomentModule, MatSelectCountryModule.forRoot('en')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
