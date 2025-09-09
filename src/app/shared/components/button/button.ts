import { Component, computed, input } from '@angular/core';
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
  public icon = input<string>();
  public type = input<ButtonType>('button');

  public iconButton = computed(() => this.icon() ? `pi pi-${this.icon()}` : '');

}
