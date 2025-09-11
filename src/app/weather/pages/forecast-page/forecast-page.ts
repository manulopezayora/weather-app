import { DatePipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ForecastCard } from "@weather/components/forecast-card/forecast-card";
import { WeatherService } from '@weather/services/weatherService/weather-service';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-forecast-page',
  imports: [TabsModule, DatePipe, DecimalPipe, UpperCasePipe, ForecastCard],
  templateUrl: './forecast-page.html',
  styleUrl: './forecast-page.css'
})
export default class ForecastPage {

  private weatherService = inject(WeatherService);
  private activatedRoute = inject(ActivatedRoute);

  private queryParam = this.activatedRoute.snapshot.params['id'];

  public forecastList = toSignal(this.weatherService.getForecastByCity(this.queryParam));

}
