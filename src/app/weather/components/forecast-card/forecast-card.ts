import { Component, input } from '@angular/core';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-forecast-card',
  imports: [CardModule],
  templateUrl: './forecast-card.html',
  styleUrl: './forecast-card.css'
})
export class ForecastCard {

  public title = input.required<string>();
  public value = input.required<string | number>();
  public unit = input<string | number>();

}
