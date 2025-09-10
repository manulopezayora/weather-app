import { Routes } from '@angular/router';
import { FavoritesPage } from './pages/favorites-page/favorites-page';
import { HomePage } from './pages/home-page/home-page';

export const weatherRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomePage
      },
      {
        path: 'favorites',
        component: FavoritesPage
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
];

export default weatherRoutes;
