import { forwardRef, Type } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

export const createNgValueAccessor = <T extends ControlValueAccessor>(component: Type<T>) => ({
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => component),
  multi: true
});

export const getTextError = (errors: ValidationErrors): string | null => {
  for (const key of Object.keys(errors)) {
    switch (key) {
      case 'required':
        return 'This field is required';

      default:
        return `Error no controlado ${key}`;
    }
  }

  return null;
}
