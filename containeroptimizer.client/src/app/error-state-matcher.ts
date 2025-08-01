import { ErrorStateMatcher} from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Component} from '@angular/core';

@Component({
  template: ''
})

export class ShowOnTouchedErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    if (!control || !control.invalid) return false;

    return control.dirty || ((control.touched && control.invalid) || !control.pristine);
  }
}
