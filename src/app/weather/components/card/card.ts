import { Component } from '@angular/core';
import { Button } from "@components/index";
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-card',
  imports: [CardModule, Button],
  templateUrl: './card.html',
  styleUrl: './card.css'
})
export class Card {

}
