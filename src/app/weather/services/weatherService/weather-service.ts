import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { CityWeather } from 'src/app/core/interfaces/city-weather';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private http = inject(HttpClient);

  public currentCity = signal<string>('');

  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  public getWeatherByCity(city: string): Observable<CityWeather> {
    return this.http.get<CityWeather>(`${this.baseUrl}/weather?q=${city}&appid=${environment.weatherKey}&units=metric&lang=en`);
  }

  public getForecastByCity(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/forecast?q=${city}&appid=${environment.weatherKey}&units=metric&lang=es`);
  }

}
