import { forwardRef, Type } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, ValidationErrors } from '@angular/forms';

export const notSpacesPattern = '^[a-zA-Z0-9]+$';

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

      case 'passwordMismatch':
        return 'The passwords must match';

      case 'pattern':
        return getPatternTextErrors(errors['pattern']);

      default:
        return `Uncontrolled error ${key}`;
    }
  }

  return null;
}

export const passwordsMatchValidator = (group: AbstractControl): ValidationErrors | null => {
  const password = group.get('password');
  const confirmPassword = group.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  };

  if (password.value !== confirmPassword.value) {
    confirmPassword.setErrors({ passwordMismatch: true });

    return { passwordMismatch: true };
  }

  if (confirmPassword.hasError('passwordMismatch')) {
    confirmPassword.setErrors(null);
  }

  return null;
}

export const getPatternTextErrors = (patternError: ValidationErrors): string => {

  if (patternError?.['requiredPattern'] === notSpacesPattern) {
    return 'The format is not correct';
  }

  return 'Uncontrolled regular expression pattern error';
}
