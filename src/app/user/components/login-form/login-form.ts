import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button, ButtonLink, InputCheckbox, InputPassword, InputText } from "@components/index";

@Component({
  selector: 'app-login-form',
  imports: [
    Button,
    ButtonLink,
    InputCheckbox,
    InputPassword,
    InputText,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
  host: {
    class: 'login-form__wrapper',
  }
})
export class LoginForm {

  private formBuilder = inject(FormBuilder);

  public loginForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    remember: [false],
  });

  public onSubmit() {
    console.log(this.loginForm.value);
  }

}
