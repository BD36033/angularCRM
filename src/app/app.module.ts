import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import {AdministrationComponent } from './administration/administration.component';
import { CommonModule } from '@angular/common';
import { AdministrationModule } from './administration/administration.module';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    LoginComponent,
    AdministrationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    AdministrationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }