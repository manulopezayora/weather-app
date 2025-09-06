import { createReducer, on } from '@ngrx/store';
import { WeatherState } from '../../core/interfaces/weather-state';
import * as WeatherActions from './weather.actions';

export const initialState: WeatherState = {
  cities: [],
  favorites: [],
  loading: false,
  error: null
};

export const weatherReducer = createReducer(
  initialState,
  on(WeatherActions.loadWeather, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(WeatherActions.loadWeatherSuccess, (state, { cityWeather }) => ({
    ...state,
    cities: [...state.cities.filter(city => city.name !== cityWeather.name), cityWeather],
    loading: false
  })),
  on(WeatherActions.loadWeatherFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  // on(WeatherActions.addFavorite, (state, { city }) => ({
  //   ...state,
  //   favorites: [...new Set([...state.favorites, city])]
  // })),
  // on(WeatherActions.removeFavorite, (state, { city }) => ({
  //   ...state,
  //   favorites: state.favorites.filter(fav => fav !== city)
  // }))
);
