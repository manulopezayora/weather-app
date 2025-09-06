import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'icon',
  imports: [],
  templateUrl: './icon.html',
  styleUrl: './icon.css'
})
export class Icon {

  public iconName = input.required<string>();
  public color = input<string>('');

  public icon = computed(() => `pi pi-${this.iconName()}`);

}
