import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login-page/login-page')
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register-page/register-page')
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
