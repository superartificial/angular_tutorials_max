import { Component } from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

// function equalValues(control: AbstractControl) {
//   const password = control.get('password')?.value;
//   const confirmPassword = control.get('confirmPassword')?.value;
//   if(password === confirmPassword) {
//     return null;
//   }
//   return { passwordsDoNotMatch: true };
// }

function equalValues(controlName1: string, controlName2: string) { // factory function
  return (control: AbstractControl) => {
    const val1 = control.get(controlName1)?.value;
    const val2 = control.get(controlName2)?.value;
    if(val1 === val2) {
      return null;
    }
    return { passwordsDoNotMatch: true };
  };
}

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [
    ReactiveFormsModule
  ]
})
export class SignupComponent {

  form = new FormGroup({
    email: new FormControl('', {validators: [ Validators.required, Validators.email ]}),
    passwords: new FormGroup({
      password: new FormControl('',{validators: [ Validators.required, Validators.minLength(6) ]}),
      confirmPassword: new FormControl('',{validators: [ Validators.required, Validators.minLength(6) ]}),
    }, {
      validators: [equalValues('password', 'confirmPassword')] // equalValues will be called at initialisation, returns a validator function specific to the supplied control names
    }),
    firstName: new FormControl('',{validators: [ Validators.required ]}),
    lastName: new FormControl('',{validators: [ Validators.required ]}),
    address: new FormGroup({
      street: new FormControl('',{validators: [ Validators.required ]}),
      number: new FormControl('',{validators: [ Validators.required ]}),
      postCode: new FormControl('',{ validators: [ Validators.required ]}),
      city: new FormControl('',{validators: [ Validators.required ]}),
    }),
    role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student'),
    agree: new FormControl<boolean>(false, {validators: Validators.requiredTrue}),
    source: new FormArray([
      new FormControl('false'),
      new FormControl('false'),
      new FormControl('false'),
    ])
  });

  onSubmit() {

    if(this.form.invalid) {
      console.log('ínvalid form');
      return;
    }

    console.log(this.form.value)
  }

  onReset() {
    this.form.reset();
  }
}
