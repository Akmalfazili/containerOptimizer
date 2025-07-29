import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Upload } from './upload';
import { BaseFormComponent } from '../base-form.component';


@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent extends BaseFormComponent implements OnInit{
  constructor() {
    super();
  }
  upload?: Upload;
  selectedDatetime!: FormControl;
  @ViewChild('picker') picker: any;  

  ngOnInit() {
   
    this.form = new FormGroup({
      containerId: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(8)]),
      arrival: new FormControl('', Validators.required),
      departure: new FormControl('', [Validators.required, this.validateDeparture]),
      destination: new FormControl('', Validators.required),
      weight: new FormControl('', [Validators.required, Validators.min(0)])
    });
    this.form.get('arrival')?.valueChanges.subscribe(() => {
      this.form.get('departure')?.updateValueAndValidity();
    })
  }
  closePicker() {
    this.picker.cancel();
  }
  private validateDateTime(control: AbstractControl): ValidationErrors | null {
    //console.log('Control errors:', control.errors);
    //const value = control.value;
    ////console.log(value);
    //if (!value) {
    //  return { dateTime: true };
    //}
    //// If value is not a string or Date, return error
    //if (typeof value !== 'string' && !(value instanceof Date)) {
    //  return { dateTime: true };
    //}
    //const parsedDate = new Date(value);
    ////console.log(parsedDate);
    //if (isNaN(parsedDate.getTime())) {
    //  return { dateTime: true };
    //}
    const value = control.value
    console.log(value);
    if (value instanceof Date) {
      console.log(value.toISOString());
      console.log(value.toLocaleString());
    }
    return null;
  }
  private validateDeparture(control: AbstractControl): ValidationErrors | null {
    const arrival = control.parent?.get('arrival')?.value;
    const departure = control.parent?.get('departure')?.value;
    if (!arrival || !departure) return null;
    const parsedArrival = new Date(arrival);
    const parsedDeparture = new Date(departure);
    return parsedArrival < parsedDeparture ? null : { departureMoreThanArrival: true };
  }

  

}
