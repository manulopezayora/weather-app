import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { WeatherService } from '@weather/services/weatherService/weather-service';
import { catchError, exhaustMap, map, of } from 'rxjs';
import * as WeatherActions from './weather.actions';

@Injectable()
export class WeatherEffects {
  private actions$ = inject(Actions);
  private weatherService = inject(WeatherService);

  loadWeather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.loadWeather),
      exhaustMap(({ city }) => this.weatherService.getWeatherByCity(city)
        .pipe(
          map(cityWeather => {
            return WeatherActions.loadWeatherSuccess({ cityWeather });
          }),
          catchError(({ message }) => of(WeatherActions.loadWeatherFailure({ error: message})))
        )
      )
    );
  });
}
