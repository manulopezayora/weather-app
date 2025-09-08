import { Routes } from '@angular/router';
import { authGuard, authMatchGuard } from './core/guards/auth/auth-guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./user/auth.routes')
  },
  {
    path: 'weather',
    loadChildren: () => import('./weather/weather.routes'),
    canActivate: [authGuard],
    canMatch: [authMatchGuard]
  },
  {
    path: '**',
    redirectTo: '/auth'
  }
];
