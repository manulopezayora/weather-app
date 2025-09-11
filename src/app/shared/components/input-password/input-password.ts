import { Component, input, signal } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule } from '@angular/forms';
import { createNgValueAccessor, getTextError } from '@utils/form-utils';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-input-password',
  imports: [FormsModule, PasswordModule, FloatLabelModule],
  templateUrl: './input-password.html',
  styleUrl: './input-password.css',
  providers: [
    createNgValueAccessor(InputPassword)
  ]
})
export class InputPassword implements ControlValueAccessor {

  public id = input.required<string>();
  public label = input.required<string>();
  public control = input.required<AbstractControl | null>();
  public placeholder = input<string>();

  public value = signal('');
  public disabled = signal(false);

  get errorMessage() {
    return getTextError(this.control()!.errors!)
  }

  private onChange: any = () => { };
  private onTouched: any = () => { };

  public onInputChange(value: string): void {
    this.value.set(value);
    this.onChange(value);
    this.onTouched();
  }

  public writeValue(value: string): void {
    this.value.set(value ?? '');
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
