import { AbstractControl, ValidationErrors } from '@angular/forms';

export function customPasswordValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.value;

  if (!password) {
    return { required: true };
  }

  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const isValidLength = password.length >= 8;

  const errors: string[] = [];

  if (!hasLowercase) {
    errors.push('lowercase letter');
  }
  if (!hasUppercase) {
    errors.push('uppercase letter');
  }
  if (!hasDigit) {
    errors.push('digit');
  }
  if (!hasSpecialChar) {
    errors.push('special character ($, &, etc.)');
  }
  if (!isValidLength) {
    errors.push('at least 8 characters long');
  }

  return errors.length ? { invalidPassword: errors } : null;
}
