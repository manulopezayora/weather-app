import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Card } from "@weather/components/card/card";
import { selectUser } from 'src/app/store/user/user.selectors';

@Component({
  selector: 'app-home-page',
  imports: [Card],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {

  private store = inject(Store);
  private user = toSignal(this.store.select(selectUser), { initialValue: null });
  private cityToSearch = signal<string>('');

  constructor() {
    this.cityToSearch.set(this.user()?.city ?? '');
  }

  // private loadWeatherEffect = effect(() => {
  //   if (this.cityToSearch()) {
  //     this.store.dispatch(loadWeather({ city: this.cityToSearch() }));
  //   }
  // });

  // public cityResource = rxResource({
  //   params: this.cityToSearch,
  //   stream: ({ params }) => this.store.select(selectCityByName({ city: params }))
  // });

  public findCityByName(name: string): void {
    this.cityToSearch.update(() => name);
  }
}
