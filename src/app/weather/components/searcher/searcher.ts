import { Component, output } from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-searcher',
  imports: [InputIcon, IconField, InputTextModule],
  templateUrl: './searcher.html',
  styleUrl: './searcher.css'
})
export class Searcher {

  public searchValue = output<string>();

  public sendValue(value: string): void {
    this.searchValue.emit(value);
  }

}
