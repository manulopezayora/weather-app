import { Component, input, signal } from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { createNgValueAccessor } from '@utils/form-utils';
import { Checkbox } from 'primeng/checkbox';

@Component({
  selector: 'app-input-checkbox',
  imports: [Checkbox, FormsModule],
  templateUrl: './input-checkbox.html',
  styleUrl: './input-checkbox.css',
  providers: [
      createNgValueAccessor(InputCheckbox)
    ]
})
export class InputCheckbox implements ControlValueAccessor {
  public id = input.required<string>();
  public label = input.required<string>();
  public placeholder = input<string>();

  public value = signal<boolean>(false);
  public disabled = signal(false);

  private onChange: any = () => { };
  private onTouched: any = () => { };

  public onInputChange(value: boolean): void {
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }

  public writeValue(value: boolean): void {
    this.value.set(value ?? false);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

}
