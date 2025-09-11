import { Component, effect, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Card } from "@weather/components/card/card";
import { Searcher } from "@weather/components/searcher/searcher";
import { WeatherService } from '@weather/services/weatherService/weather-service';
import { selectUser } from 'src/app/store/user/user.selectors';
import { loadWeather } from 'src/app/store/weather/weather.actions';
import { selectCityById } from 'src/app/store/weather/weather.selectors';

@Component({
  selector: 'app-home-page',
  imports: [Card, Searcher],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {

  private store = inject(Store);
  private weatherService = inject(WeatherService);

  private user = toSignal(this.store.select(selectUser), { initialValue: null });
  private cityToSearch = signal<string>('');

  constructor() {
    this.cityToSearch.set(this.user()?.city ?? '');
  }

  private loadWeatherEffect = effect(() => {
    if (this.cityToSearch()) {
      this.store.dispatch(loadWeather({ city: this.cityToSearch() }));
    }
  });

  public cityResource = rxResource({
    params: this.weatherService.currentCity,
    stream: ({ params }) => this.store.select(selectCityById(params))
  });

  public findCityByName(name: string): void {
    this.cityToSearch.update(() => name);
  }
}
