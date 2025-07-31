import { Component, OnInit, ViewChild, QueryList } from '@angular/core';
import { FormArray,FormGroup, FormBuilder,FormControl, Validators, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Upload } from './upload';
import { BaseFormComponent } from '../base-form.component';
import { ShowOnTouchedErrorStateMatcher } from '../error-state-matcher';
import { Router} from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent extends BaseFormComponent implements OnInit{
  constructor(private router: Router) {
    super();
  }
  matcher = new ShowOnTouchedErrorStateMatcher();
  upload?: Upload[];
  uploadFormsArray!: FormArray;

  ngOnInit() {
    this.form = new FormGroup({
      containers: new FormArray([this.createContainerGroup()])
    });
  }


  createContainerGroup(): FormGroup {
    const group = new FormGroup({
      containerId: new FormControl('', [Validators.required, Validators.maxLength(20), Validators.minLength(8)]),
      arrival: new FormControl('', Validators.required),
      departure: new FormControl('', [Validators.required, this.validateDeparture]),
      destination: new FormControl('', Validators.required),
      weight: new FormControl('', [Validators.required, Validators.min(1)])
    }, { updateOn: 'blur' });
    group.get('arrival')?.valueChanges.subscribe(() => {
      group.get('departure')?.updateValueAndValidity();
    });
    return group;
  }

  get containers(): FormArray {
    return this.form.get('containers') as FormArray;
  }

  addContainer() {
    this.containers.push(this.createContainerGroup(), { emitEvent:false });
  }

  removeContainer(index: number) {
    this.containers.removeAt(index);
  }

  private validateDeparture(control: AbstractControl): ValidationErrors | null {
    const arrival = control.parent?.get('arrival')?.value;
    const departure = control.parent?.get('departure')?.value;
    if (!arrival || !departure) return null;
    const parsedArrival = new Date(arrival);
    const parsedDeparture = new Date(departure);
    return parsedArrival < parsedDeparture ? null : { departureMoreThanArrival: true };
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.upload = this.containers.value.map(
      (container: any, index: number) => ({
        id: index + 1,
        containerId: container.containerId,
        arrival: new Date(container.arrival),
        departure: new Date(container.departure),
        weight: Number(container.weight),
        destination: container.destination.name
      }));
    const uploads = this.upload;
    this.router.navigate(['/summary'], { state: { uploads } });
  }
  
  //private validateDateTime(control: AbstractControl): ValidationErrors | null {
  //  //console.log('Control errors:', control.errors);
  //  //const value = control.value;
  //  ////console.log(value);
  //  //if (!value) {
  //  //  return { dateTime: true };
  //  //}
  //  //// If value is not a string or Date, return error
  //  //if (typeof value !== 'string' && !(value instanceof Date)) {
  //  //  return { dateTime: true };
  //  //}
  //  //const parsedDate = new Date(value);
  //  ////console.log(parsedDate);
  //  //if (isNaN(parsedDate.getTime())) {
  //  //  return { dateTime: true };
  //  //}
  //}

}
