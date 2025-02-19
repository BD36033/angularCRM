import { Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    // Composant accueil
    { path: '', loadComponent: () => import('./accueil/accueil.component').then(m => m.AccueilComponent) },
    { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
    { path: 'login-admin', loadComponent: () => import('./login-admin/login-admin.component').then(m => m.LoginAdminComponent) },
    
    
    // routes de l'administration ancienne méthodes
    // { 
    //   path: 'administration', 
    //   loadComponent: () => import('./administration/administration.component').then(m => m.AdministrationComponent),
    //   canActivate: [AuthGuard],
    //   data: { requiresAdmin: true }
    // },
    // { 
    //   path: 'administration/new', 
    //   loadComponent: () => import('./administration/administration-detail/administration-detail.component').then(m => m.AdministrationDetailComponent),
    //   canActivate: [AuthGuard]
    // },
    // { 
    //   path: 'administration/:id', 
    //   loadComponent: () => import('./administration/administration-detail/administration-detail.component').then(m => m.AdministrationDetailComponent),
    //   canActivate: [AuthGuard]
    // }

    //regroupement des routes de l'administration | On peut optimiser encore plus les routes au niveau de .then(m => m.AdministrationDetailComponent) }
    { 
      path: 'administration',
      canActivate: [AuthGuard], // Protection de l'administration
      data: { requiresAdmin: true },
      loadComponent: () => import('./administration/administration.component').then(m => m.AdministrationComponent),
      children: [
        { path: 'new', loadComponent: () => import('./administration/administration-detail/administration-detail.component').then(m => m.AdministrationDetailComponent) },
        { path: ':id', loadComponent: () => import('./administration/administration-detail/administration-detail.component').then(m => m.AdministrationDetailComponent) }
      ]
    }








];