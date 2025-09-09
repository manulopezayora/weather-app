import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Button, ButtonLink, InputCheckbox, InputPassword, InputText } from "@components/index";
import { notSpacesPattern } from '@utils/form-utils';
import { AuthService } from 'src/app/core/services/auth-service/auth-service';

interface LoginFormControls {
  username: FormControl<string>;
  password: FormControl<string>;
  remember: FormControl<boolean>;
}

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
  styleUrl: './login-form.css'
})
export class LoginForm {

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);

  public loginForm: FormGroup<LoginFormControls> = this.formBuilder.group<LoginFormControls>({
    username: this.formBuilder.control('', { validators: [Validators.required, Validators.pattern(notSpacesPattern)], nonNullable: true }),
    password: this.formBuilder.control('', { validators: [Validators.required], nonNullable: true }),
    remember: this.formBuilder.control(false, { validators: [Validators.required], nonNullable: true }),
  });

  public onSubmit(): void {
     this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as User)
    }
  }

}
