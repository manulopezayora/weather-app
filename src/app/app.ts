import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@components/index';
import { Store } from '@ngrx/store';
import { AuthService } from './core/services/auth-service/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private store = inject(Store);
  private authService = inject(AuthService);

  constructor() {
    this.authService.autoLogin();
    // this.store.dispatch(loadWeather({ city: 'valencia' }));
  }
}
