import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputText } from "@components/index";
import { InputCheckbox } from "@components/input-checkbox/input-checkbox";
import { InputPassword } from "@components/input-password/input-password";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login-page',
  imports: [
    ButtonModule,
    InputPassword,
    InputText,
    ReactiveFormsModule,
    RouterLink,
    InputCheckbox
],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export default class LoginPage {
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
