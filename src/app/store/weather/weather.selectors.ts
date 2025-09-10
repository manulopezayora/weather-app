import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from '../../core/interfaces/weather-state';
import { weatherAdapter } from './weather.reducer';

export const selectWeatherState = createFeatureSelector<WeatherState>('weather');

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = weatherAdapter.getSelectors(selectWeatherState);

export const selectWeatherEntities = selectEntities;
export const selectAllWeather = selectAll;

export const selectCityById = (id: number) => createSelector(
  selectWeatherEntities,
  (entities) => entities[id]
);
