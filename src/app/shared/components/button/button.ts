import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

type ButtonType = 'submit' | 'button';

@Component({
  selector: 'app-button',
  imports: [ButtonModule],
  templateUrl: './button.html',
  styleUrl: './button.css'
})
export class Button {

  public label = input<string>();
  public type = input<ButtonType>('button');

}
