import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, forkJoin, map, Observable } from 'rxjs';
import { CityWeather } from 'src/app/core/interfaces/city-weather';
import { Forecast } from 'src/app/core/interfaces/forecast';
import { CityForecast } from 'src/app/core/interfaces/forecast-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private http = inject(HttpClient);

  public currentCity = signal<number>(0);

  private baseUrl = '/api';
  // private baseUrl = 'https://api.openweathermap.org/data/2.5';

  public getWeatherByCity(city: string): Observable<CityWeather> {
    return this.http.get<CityWeather>(`${this.baseUrl}/weather?q=${city}&units=metric&lang=en`);
    // return this.http.get<CityWeather>(`${this.baseUrl}/weather?q=${city}&appid=${environment.weatherKey}&units=metric&lang=en`);
  }

  public getCitiesByIds(ids: number[]): Observable<CityWeather[]> {
    // const requests = ids.map(id => this.http.get<CityWeather>(`${this.baseUrl}/weather?id=${id}&appid=${environment.weatherKey}&units=metric&lang=en`).pipe(
    const requests = ids.map(id => this.http.get<CityWeather>(`${this.baseUrl}/weather?id=${id}&units=metric&lang=en`).pipe(
      catchError((error: HttpErrorResponse) => {
        throw Error(error.statusText);
      })
    ));

    return forkJoin(requests).pipe(
      map(results => results)
    );
  }

  public getForecastByCity(city: string): Observable<Forecast[]> {
    return this.http.get<CityForecast>(`${this.baseUrl}/forecast?id=${city}&appid=${environment.weatherKey}&units=metric&lang=en`).pipe(
      map(res => this.forecastMapper(res))
    );
  }

  private forecastMapper(response: CityForecast): Forecast[] {
    const grouped: { [date: string]: any[] } = response.list.reduce((acc: Record<string , CityForecast[]>, item: CityForecast) => {
      const date = item.dt_txt.split(' ')[0];
      acc[date] = acc[date] || [];
      acc[date].push(item);

      return acc;
    }, {});

    return Object.entries(grouped).map(([date, cityForecast]: [string, CityForecast[]]) => {
      const temps = cityForecast.map(city => city.main.temp);
      const humidities = cityForecast.map(city => city.main.humidity);
      const pops = cityForecast.map(city => city.pop || 0);
      const winds = cityForecast.map(city => city.wind);

      const weatherCounts: Record<string, number> = {};
      cityForecast.forEach(city => {
        const desc = city.weather[0].description;
        weatherCounts[desc] = (weatherCounts[desc] || 0) + 1;
      });
      const mostCommonWeather = cityForecast.reduce((prev, curr) =>
        weatherCounts[curr.weather[0].description] > weatherCounts[prev.weather[0].description] ? curr : prev
      );

      return {
        name: response.city.name,
        date,
        temp_min: Math.min(...temps),
        temp_max: Math.max(...temps),
        humidity_avg: Math.round(humidities.reduce((a, b) => a + b, 0) / humidities.length),
        weather: {
          main: mostCommonWeather.weather[0].main,
          description: mostCommonWeather.weather[0].description,
          icon: mostCommonWeather.weather[0].icon
        },
        pop_max: Math.max(...pops),
        wind_max: winds.reduce((prev, curr) => (curr.speed > prev.speed ? curr : prev))
      };
    });
  }

}
