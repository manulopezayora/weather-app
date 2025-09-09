import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '@components/index';
import { Toast } from 'primeng/toast';
import { AuthService } from './core/services/auth-service/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Toast],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private authService = inject(AuthService);

  constructor() {
    this.authService.autoLogin();
    // this.store.dispatch(loadWeather({ city: 'valencia' }));
  }
}
