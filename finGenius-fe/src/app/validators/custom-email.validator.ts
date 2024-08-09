import { AbstractControl, ValidationErrors } from '@angular/forms';

export function customEmailValidator(
  control: AbstractControl
): ValidationErrors | null {
  const email = control.value;

  if (!email) {
    return { required: true };
  }

  const emailPrefixRegex = /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*$/;
  const emailDomainRegex = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;

  const [prefix, domain] = email.split('@');

  if (!prefix || !domain) {
    return { invalidEmail: true };
  }

  const isPrefixValid = emailPrefixRegex.test(prefix);
  const isDomainValid = emailDomainRegex.test(domain);

  if (!isPrefixValid) {
    return { invalidPrefix: true };
  }

  if (!isDomainValid) {
    return { invalidDomain: true };
  }

  return null;
}
