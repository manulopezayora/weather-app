import { Component, computed, input } from '@angular/core';
import { Button } from "@components/index";
import { CardModule } from 'primeng/card';
import { CityWeather } from 'src/app/core/interfaces/city-weather';

@Component({
  selector: 'app-card',
  imports: [CardModule, Button],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {

  public city = input.required<CityWeather>();

  public name = computed(() => this.city().name);
  public iconUrl = computed(() => `https://openweathermap.org/img/wn/${this.city().weather[0].icon}@2x.png`);
  public description = computed(() => this.city().weather[0].description);
  public temp = computed(() => `${Math.floor(this.city().main.temp)} ºC`);
  public weather = computed(() => this.city().weather[0].main);

}
