import { Component } from '@angular/core';
import { PasswordInputComponent } from '../password-input/password-input.component';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [PasswordInputComponent],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {

  password: string = '';
  confirmPassword: string = '';
  passwordsMatches!: boolean;

  onPasswordChange(value: string, field: 'password' | 'confirmPassword') : void {
    if (field === 'password') {
      this.password = value;
    } else {
      this.confirmPassword = value;
    }

    this.checkIfPasswordsMatches();
  }

  checkIfPasswordsMatches() {
    this.passwordsMatches = this.password === this.confirmPassword;
  }
}
