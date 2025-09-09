import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonLink } from '@components/index';
import { RegisterForm } from '../../components/register-form/register-form';

@Component({
  selector: 'app-register-page',
  imports: [
    ButtonLink,
    RouterLink,
    RegisterForm
],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export default class RegisterPage {

}
