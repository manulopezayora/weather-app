import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, forkJoin, map, Observable } from 'rxjs';
import { CityWeather } from 'src/app/core/interfaces/city-weather';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private http = inject(HttpClient);

  public currentCity = signal<number>(0);

  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  public getWeatherByCity(city: string): Observable<CityWeather> {
    return this.http.get<CityWeather>(`${this.baseUrl}/weather?q=${city}&appid=${environment.weatherKey}&units=metric&lang=en`);
  }

  public getCitiesByIds(ids: number[]): Observable<CityWeather[]> {
    const requests = ids.map(id => this.http.get<CityWeather>(`${this.baseUrl}/weather?id=${id}&appid=${environment.weatherKey}&units=metric&lang=en`).pipe(
      catchError((error: HttpErrorResponse) => {
        throw Error(error.statusText);
      })
    ));

    return forkJoin(requests).pipe(
      map(results => results)
    );
  }

  public getForecastByCity(city: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/forecast?q=${city}&appid=${environment.weatherKey}&units=metric&lang=es`);
  }

}
