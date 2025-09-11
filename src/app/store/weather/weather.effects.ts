import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { ToastService } from '@services/toast-service/toast-service';
import { WeatherService } from '@weather/services/weatherService/weather-service';
import { catchError, exhaustMap, filter, map, of, switchMap, withLatestFrom } from 'rxjs';
import { selectFavoriteIds } from '../user/user.selectors';
import * as WeatherActions from './weather.actions';
import { selectWeatherEntities } from './weather.selectors';

@Injectable()
export class WeatherEffects {

  private actions$ = inject(Actions);
  private weatherService = inject(WeatherService);
  private toastService = inject(ToastService);
  private store = inject(Store);

  loadWeather$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.loadWeather),
      exhaustMap(({ city }) => this.weatherService.getWeatherByCity(city)
        .pipe(
          map(cityWeather => {
            this.weatherService.currentCity.set(cityWeather.id);

            return WeatherActions.loadWeatherSuccess({ cityWeather });
          }),
          catchError((error: HttpErrorResponse) => {
            this.toastService.showError(`Location ${error.statusText}`);

            return of(WeatherActions.loadWeatherFailure({ error: error.message}));
          })
        )
      )
    );
  });

  loadMissingFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(WeatherActions.loadWeatherBatch),
      withLatestFrom(
        this.store.select(selectFavoriteIds),
        this.store.select(selectWeatherEntities)
      ),
      map(([_, favoriteIds, weatherEntities]) => favoriteIds.filter(id => !weatherEntities[id])),
      filter(missing => missing.length > 0),
      switchMap(missingIds => this.weatherService.getCitiesByIds(missingIds)
        .pipe(
          map(cities => WeatherActions.loadWeatherBatchSuccess({ cities })),
          catchError((error: string) => {
            this.toastService.showError(`Location ${error}`);

            return of(WeatherActions.loadWeatherBatchFailure({ error }));
          })
        )
      )
    );
  });

}
