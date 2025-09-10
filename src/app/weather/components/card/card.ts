import { Component, computed, inject, input } from '@angular/core';
import { Button } from "@components/index";
import { Store } from '@ngrx/store';
import { CardModule } from 'primeng/card';
import { CityWeather } from 'src/app/core/interfaces/city-weather';
import { addToFavorite } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-card',
  imports: [CardModule, Button],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {

  private store = inject(Store);

  public city = input.required<CityWeather>();

  public name = computed(() => this.city().name);
  public iconUrl = computed(() => `https://openweathermap.org/img/wn/${this.city().weather[0].icon}@2x.png`);
  public description = computed(() => this.city().weather[0].description);
  public temp = computed(() => `${Math.floor(this.city().main.temp)} ºC`);
  public weather = computed(() => this.city().weather[0].main);

  public addToFavorite(id: number) {
    this.store.dispatch(addToFavorite({ id }));
  }

}
