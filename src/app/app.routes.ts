import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './login/login.component';
import { AdministrationComponent } from './administration/administration.component';
import { AdministrationDetailComponent } from './administration/administration-detail/administration-detail.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    // Composant accueil
    { path: '', component: AccueilComponent },
    { path: 'login', component: LoginComponent },
    { 
      path: 'administration', 
      component: AdministrationComponent,
      canActivate: [AuthGuard]
    },
    { 
      path: 'administration/new', 
      component: AdministrationDetailComponent,
      canActivate: [AuthGuard]
    },
    { 
      path: 'administration/:id', 
      component: AdministrationDetailComponent,
      canActivate: [AuthGuard]
    }
];