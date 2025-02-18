import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { AdministrationComponent } from './administration/administration.component';

export const routes: Routes = [
    // Composant accueil
    { path: '', component: AccueilComponent },
    { path: 'login', component: LoginComponent },
    { path: 'administration', component: AdministrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule { }