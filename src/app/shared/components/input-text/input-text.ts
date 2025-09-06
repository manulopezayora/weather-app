import { Component, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { createNgValueAccessor } from '@utils/form-utils';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-text',
  imports: [InputTextModule, FormsModule],
  templateUrl: './input-text.html',
  styleUrl: './input-text.css',
  providers: [
    createNgValueAccessor(InputText)
  ]
})
export class InputText implements ControlValueAccessor {
  public value = signal('');
  public disabled = signal(false);

  private onChange: any = () => { };
  private onTouched: any = () => { };

  public onInputChange(value: string): void {
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }

  writeValue(value: string): void {
    this.value.set(value ?? '');
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
