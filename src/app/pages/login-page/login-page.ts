import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputText } from "@components/index";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login-page',
  imports: [InputText, ReactiveFormsModule, ButtonModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css'
})
export default class LoginPage {
  private formBuilder = inject(FormBuilder);

  public loginForm: FormGroup = this.formBuilder.group({
    username: [''],
    password: [''],
  });

  public onSubmit() {
    console.log(this.loginForm.value);
  }
}
