import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from '../../core/interfaces/weather-state';

export const selectWeatherState = createFeatureSelector<WeatherState>('weather');

export const selectCities = createSelector(
  selectWeatherState,
  (state) => state.cities
);
