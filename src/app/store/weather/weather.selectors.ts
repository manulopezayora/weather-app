import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherState } from '../../core/interfaces/weather-state';

export const selectWeatherState = createFeatureSelector<WeatherState>('weather');

export const selectCities = createSelector(
  selectWeatherState,
  (state) => state.cities
);

export const selectCityByName = ({ city }: { city: string }) => createSelector(
  selectWeatherState,
  ({ cities }) => {

    if (cities.length) {
      return cities.find(({ name }) => city.trim().toLowerCase() === name.trim().toLowerCase());
    }

    return null;
  }
);
