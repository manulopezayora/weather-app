import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonLink } from '@components/index';

@Component({
  selector: 'app-register-page',
  imports: [
    ButtonLink,
    RouterLink,
  ],
  templateUrl: './register-page.html',
  styleUrl: './register-page.css'
})
export default class RegisterPage {

}
