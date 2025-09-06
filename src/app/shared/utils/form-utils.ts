import { forwardRef, Type } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const createNgValueAccessor = <T extends ControlValueAccessor>(component: Type<T>) => ({
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => component),
  multi: true
});
