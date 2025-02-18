import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AppRoutingModule } from './app.routes';
import { LoginComponent } from './login/login.component';
import {AdministrationComponent } from './administration/administration.component';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginComponent,
    AdministrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }