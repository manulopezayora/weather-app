import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import Aura from '@primeuix/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { UserEffects } from './store/user/user.effects';
import { userReducer } from './store/user/user.reducer';
import { WeatherEffects } from './store/weather/weather.effects';
import { weatherReducer } from './store/weather/weather.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideStore({
      user: userReducer,
      weather: weatherReducer
    }),
    provideEffects([
      UserEffects,
      WeatherEffects
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false || 'none'
        }
      }
    })
  ]
};
