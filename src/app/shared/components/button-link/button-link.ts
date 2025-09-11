import { Component, input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button-link',
  imports: [ButtonModule],
  templateUrl: './button-link.html',
  styleUrl: './button-link.css'
})
export class ButtonLink {

  public label = input.required<string>();

}
