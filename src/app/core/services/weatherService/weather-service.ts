import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private http = inject(HttpClient);

  private apiKey: string = 'de0967f4fdcf0ed3f6609d7fa301d2b4';
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  getWeatherByCity(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=es`);
  }

  getForecastByCity(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric&lang=es`);
  }
}
