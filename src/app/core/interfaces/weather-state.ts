import { CityWeather } from './city-weather';

export interface WeatherState {
  cities: CityWeather[];
  favorites: string[];
  loading: boolean;
  error: string | null;
}
