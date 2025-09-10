import { createAction, props } from '@ngrx/store';
import { CityWeather } from '../../core/interfaces/city-weather';

export const loadWeather = createAction(
  '[Weather] Load Weather',
  props<{ city: string }>()
);

export const loadWeatherSuccess = createAction(
  '[Weather] Load Weather Success',
  props<{ cityWeather: CityWeather }>()
);

export const loadWeatherFailure = createAction(
  '[Weather] Load Weather Failure',
  props<{ error: string }>()
);

export const loadWeatherBatch = createAction(
  '[Weather] Load Weather Batch',
  props<{ ids: number[] }>()
);

export const loadWeatherBatchSuccess = createAction(
  '[Weather] Load Weather Batch Success',
  props<{ cities: CityWeather[] }>()
);

export const loadWeatherBatchFailure = createAction(
  '[Weather] Load Weather Batch Failure',
  props<{ error: any }>()
);
