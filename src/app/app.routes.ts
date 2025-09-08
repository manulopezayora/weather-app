import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./user/pages/login-page/login-page')
  },
  {
    path: 'register',
    loadComponent: () => import('./user/pages/register-page/register-page')
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
