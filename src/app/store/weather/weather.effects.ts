import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ToastService } from '@services/toast-service/toast-service';
import { WeatherService } from '@weather/services/weatherService/weather-service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import * as WeatherActions from './weather.actions';

@Injectable()
export class WeatherEffects {

  private actions$ = inject(Actions);
  private weatherService = inject(WeatherService);
  private toastService = inject(ToastService);

  loadWeather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.loadWeather),
      exhaustMap(({ city }) => this.weatherService.getWeatherByCity(city)
        .pipe(
          map(cityWeather => {
            this.weatherService.currentCity.set(cityWeather.name);

            return WeatherActions.loadWeatherSuccess({ cityWeather });
          }),
          catchError((error: HttpErrorResponse) => {
            this.toastService.showError(`Location ${error.statusText}`);

            return of(WeatherActions.loadWeatherFailure({ error: error.message}))
          })
        )
      )
    );
  });
}
