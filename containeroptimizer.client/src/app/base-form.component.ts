import { Component } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

@Component({
  template: ''
})

export abstract class BaseFormComponent {
  form!: FormGroup;
  constructor() { }

  getErrors(
    control: AbstractControl,
    displayName: string,
    customMessages: { [key: string] :string} |null=null
  ): string[]{
    //if (!(control.dirty||control.touched)) {
    //  return [];
    //}
    var errors: string[] = [];
    const controlErrors = control.errors || {};
    Object.keys(control.errors || {}).forEach((key) => {
      switch (key) {
        case 'required':
          errors.push(`${displayName} ${customMessages?.[key] ?? "is required."}`);
          break;
        case 'minlength':
          const min = controlErrors['minlength']?.requiredLength;
          errors.push(customMessages?.[key] ??
            `${displayName} must be more than ${min} characters long.`);
          break;
        case 'maxlength':
          const max = controlErrors['maxlength']?.requiredLength;
          errors.push(customMessages?.[key] ??
            `${displayName} must not be more than ${max} characters long.`);
          break;
        case 'matDatepickerParse':
          errors.push(`${customMessages?.[key] ?? "Please enter valid date and time."}`);
          break;
        case 'min':
          errors.push(`${customMessages?.[key] ?? "Weight must be more than 0."}`);
          break;
        case 'departureMoreThanArrival':
          errors.push(`${customMessages?.[key] ?? "Departure must be after Arrival."}`);
          break;
        default:
          errors.push(`${displayName} is invalid.`);
          break;
      }
    });
    return errors;
  }
}
