import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { CityWeather } from 'src/app/core/interfaces/city-weather';
import { WeatherState } from '../../core/interfaces/weather-state';
import * as WeatherActions from './weather.actions';

export const weatherAdapter = createEntityAdapter<CityWeather>({
  selectId: (city) => city.id
});

export const initialState: WeatherState = weatherAdapter.getInitialState({
  loading: false,
  error: null
});

export const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.loadWeather, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(WeatherActions.loadWeatherSuccess, (state, { cityWeather }) => (weatherAdapter.upsertOne(cityWeather, {
      ...state,
      loading: false
    }))),
  on(WeatherActions.loadWeatherFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(WeatherActions.loadWeatherBatch, (state) => ({ ...state, loading: true })),
  on(WeatherActions.loadWeatherBatchSuccess, (state, { cities }) =>
    weatherAdapter.upsertMany(cities, { ...state, loading: false })
  ),
  on(WeatherActions.loadWeatherBatchFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
