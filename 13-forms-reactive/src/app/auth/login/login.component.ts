import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime, of} from "rxjs";

function mustContainQuestionMark(control: AbstractControl) {
  if(control.value.includes('?')) {
    return null;
  }
  return { doesNotContainQuestionMark: true }
}

function emailIsUnique(control: AbstractControl) {
  if(control.value !== 'test@xe.com') {
    return of(null);
  }
  return of({notUnique: true});
}

let initialEmail= '';
const savedForm = window.localStorage.getItem('saved-login-form');
if(savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmail = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    ReactiveFormsModule
  ]
})
export class LoginComponent implements OnInit {

  destroyRef = inject(DestroyRef);

  ngOnInit() {

    // const savedForm = window.localStorage.getItem('saved-login-form');
    //
    // if(savedForm) {
    //   const loadedForm = JSON.parse(savedForm);
    //   // this.form.controls.email.setValue(loadedForm.email);
    //   this.form.patchValue(loadedForm); // use patch value to update part of form
    // }

    const subscription =  this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem('saved-login-form', JSON.stringify({ email: value.email }));
      }
    });
    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }


  form = new FormGroup({
    email: new FormControl(initialEmail, {
      validators: [ Validators.required, Validators.email ],
      asyncValidators: [emailIsUnique]
    }),
    password: new FormControl('',{
      validators: [ Validators.required, Validators.minLength(6),mustContainQuestionMark ]
    })
  });

  get emailIsInvalid() {
    return (
        this.form.controls.email.invalid &&
        this.form.controls.email.dirty &&
        this.form.controls.email.touched
    );
  }

  get passwordIsInvalid() {
    return (
        this.form.controls.password.invalid &&
        this.form.controls.password.dirty &&
        this.form.controls.password.touched
    );
  }

  onSubmit() {
    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);
  }

}
