import { Routes } from '@angular/router';




import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    // Composant accueil
    { path: '', loadComponent: () => import('./accueil/accueil.component').then(m => m.AccueilComponent) },
    { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
    { 
      path: 'administration', 
      loadComponent: () => import('./administration/administration.component').then(m => m.AdministrationComponent),
      canActivate: [AuthGuard]
    },
    { 
      path: 'administration/new', 
      loadComponent: () => import('./administration/administration-detail/administration-detail.component').then(m => m.AdministrationDetailComponent),
      canActivate: [AuthGuard]
    },
    { 
      path: 'administration/:id', 
      loadComponent: () => import('./administration/administration-detail/administration-detail.component').then(m => m.AdministrationDetailComponent),
      canActivate: [AuthGuard]
    }
];