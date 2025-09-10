import { EntityState } from '@ngrx/entity';
import { CityWeather } from './city-weather';

export interface WeatherState extends EntityState<CityWeather> {
  loading: boolean;
  error: string | null;
}
