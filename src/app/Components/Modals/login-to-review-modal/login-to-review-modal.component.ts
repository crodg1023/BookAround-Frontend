import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { PasswordInputComponent } from '../../Utils/password-input/password-input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/Auth/auth.service';
import { CommonModule } from '@angular/common';
import { Credentials } from '../../../Interfaces/credentials';

@Component({
  selector: 'app-login-to-review-modal',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    PasswordInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './login-to-review-modal.component.html',
  styleUrl: './login-to-review-modal.component.scss'
})
export class LoginToReviewModalComponent implements OnInit {

  loginForm!: FormGroup;
  hasError = false;
  loginMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.defineForm();
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  defineForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (this.loginForm.valid) {
      const credentials: Credentials = {
        email: this.email?.value,
        password: this.password?.value
      }

      this.authService.login(credentials).subscribe({
        next: () => {
          this.hasError = false;
          this.loginMessage = 'Accediendo!';
        },
        error: error => {
          this.hasError = true;
          this.loginMessage = error;
        }
      });
    }
  }
}
