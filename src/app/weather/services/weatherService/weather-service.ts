import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private http = inject(HttpClient);

  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  getWeatherByCity(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/weather?q=${city}&appid=${environment.weatherKey}&units=metric&lang=en`);
    // return this.http.get(`${this.baseUrl}/group?id=2521451&units=metric&lang=es&appid=50dd691b6581f6ddac1585d1c05517e6`);
  }

  getForecastByCity(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/forecast?q=${city}&appid=${environment.weatherKey}&units=metric&lang=es`);
  }
}
