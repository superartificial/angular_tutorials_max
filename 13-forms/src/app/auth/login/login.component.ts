import {afterNextRender, Component, DestroyRef, inject, viewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    FormsModule
  ]
})
export class LoginComponent {

  private form = viewChild.required<NgForm>("form");
  private destroyRef = inject(DestroyRef);

  constructor() {
    // form not initialised until after template rendering
    afterNextRender(()=> {

      const savedForm =  window.localStorage.getItem("saved-login-form");
      if(savedForm) {
        const savedFormObj = JSON.parse(savedForm);
        const savedEmail = savedFormObj.email;
        // this.form().setValue({email: savedEmail, password: ""});
        // workaround for form not being initialised
        setTimeout(() => this.form().controls['email'].setValue(savedEmail), 1);
      }

      const subscription = this.form().valueChanges
        ?.pipe(debounceTime(500))
        .subscribe({
          next: (value) =>
          window.localStorage.setItem("saved-login-form", JSON.stringify({email: value.email}))
      });
      this.destroyRef.onDestroy(() => subscription?.unsubscribe())
    });
  }

  onSubmit(formData: NgForm) {

    if(formData.form.invalid) {
      return;
    }

    const enteredEmail = formData.value.email;
    const enteredPassword = formData.value.password;
    console.log(enteredEmail, enteredPassword);

    formData.form.reset();

  }
}
