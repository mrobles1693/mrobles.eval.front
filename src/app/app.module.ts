import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatToolbarModule } from '@angular/material/toolbar'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from "@angular/material/dialog";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormReservarComponent } from './dialogs/form-reservar/form-reservar.component';
import { DetailReservaComponent } from './dialogs/detail-reserva/detail-reserva.component';

@NgModule({
  declarations: [
    AppComponent,
    FormReservarComponent,
    DetailReservaComponent
  ],
  imports: [
    BrowserModule
    ,AppRoutingModule
    ,MatToolbarModule
    ,FormsModule
    ,ReactiveFormsModule
    ,MatInputModule
    ,MatSelectModule
    ,MatFormFieldModule
    ,MatDatepickerModule
    ,MatNativeDateModule
    ,MatPaginatorModule
    ,MatIconModule
    ,MatDividerModule
    ,MatButtonModule
    ,MatDialogModule
    ,BrowserAnimationsModule
    ,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
