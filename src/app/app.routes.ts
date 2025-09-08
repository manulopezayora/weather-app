import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./user/auth.routes')
  },
  {
    path: 'weather',
    loadChildren: () => import('./weather/weather.routes')
  },
  {
    path: '**',
    redirectTo: '/auth'
  }
];
