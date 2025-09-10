import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Card } from "@weather/components/card/card";
import { selectUser } from 'src/app/store/user/user.selectors';
import { loadWeatherBatch } from 'src/app/store/weather/weather.actions';
import { selectFavoriteWeatherByUser } from 'src/app/store/weather/weather.selectors';

@Component({
  selector: 'app-favorites-page',
  imports: [Card],
  templateUrl: './favorites-page.html',
  styleUrl: './favorites-page.css'
})
export class FavoritesPage {

  private store = inject(Store);

  public readonly weatherList = this.store.selectSignal(selectFavoriteWeatherByUser);

  private user = toSignal(this.store.select(selectUser), { initialValue: null });

  constructor() {
    this.store.dispatch(loadWeatherBatch({ ids: this.user()?.favorites ?? [] }));
  }

}
