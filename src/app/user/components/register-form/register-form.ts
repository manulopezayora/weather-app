import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button, InputPassword, InputText } from "@components/index";
import { passwordsMatchValidator } from '@utils/form-utils';
import { UserService } from '../../services/user-service/user-service';

interface RegisterFormControls {
  username: FormControl<string>;
  city: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

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
  private userService = inject(UserService);

  public registerForm: FormGroup<RegisterFormControls> = this.formBuilder.group<RegisterFormControls>({
    username: this.formBuilder.control('', { validators: [Validators.required], nonNullable: true }),
    city: this.formBuilder.control('', { validators: [Validators.required], nonNullable: true }),
    password: this.formBuilder.control('', { validators: [Validators.required], nonNullable: true }),
    confirmPassword: this.formBuilder.control('', { validators: [Validators.required], nonNullable: true }),
  }, {
    validators: [passwordsMatchValidator]
  });

  public onSubmit() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      const { username, city, password } = this.registerForm.value;
      const newUser = { username, city, password };
      this.userService.createUser(newUser as User);
    }
  }

}
