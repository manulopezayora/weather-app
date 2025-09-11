import { Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Button } from "@components/index";
import { Store } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { CityWeather } from 'src/app/core/interfaces/city-weather';
import { addToFavorite, removeFromFavorite } from 'src/app/store/user/user.actions';
import { selectUser } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-card',
  imports: [CardModule, Button],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {

  private store = inject(Store);
  private router = inject(Router);

  public city = input.required<CityWeather>();

  public name = computed(() => this.city().name);
  public iconUrl = computed(() => `https://openweathermap.org/img/wn/${this.city().weather[0].icon}@2x.png`);
  public description = computed(() => this.city().weather[0].description);
  public temp = computed(() => `${Math.round(this.city().main.temp)} ºC`);
  public weather = computed(() => this.city().weather[0].main);
  public hasFavorite = computed(() => this.user()?.favorites?.includes(this.city().id));

  private user = toSignal(this.store.select(selectUser));

  public navigateToForecast(id: number): void {
    this.router.navigate(['/weather/forecast', id]);
  }

  public addToFavorites(id: number): void {
    this.store.dispatch(addToFavorite({ id }));
  }

  public removeFromFavorites(id: number): void {
    this.store.dispatch(removeFromFavorite({ id }));
  }

}
