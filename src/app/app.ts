import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@components/index';
import { Store } from '@ngrx/store';
import { loadWeather } from './store/weather/weather.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'weather-app';

  private store = inject(Store);

  constructor() {
    this.store.dispatch(loadWeather({ city: 'valencia' }));
  }
}
