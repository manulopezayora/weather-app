import { CityWeather } from './city-weather';

export interface WeatherState {
  cities: CityWeather[];
  favorites: CityWeather[];
  loading: boolean;
  error: string | null;
}
