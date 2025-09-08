import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button, InputPassword, InputText } from "@components/index";

@Component({
  selector: 'app-register-form',
  imports: [
    Button,
    InputPassword,
    InputText,
    ReactiveFormsModule,
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css'
})
export class RegisterForm {

  private formBuilder = inject(FormBuilder);

  public registerForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required]],
    city: ['', [Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]],
  });

  public onSubmit() {
    console.log(this.registerForm.value);
  }

}
