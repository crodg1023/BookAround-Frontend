import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../../Services/modal.service';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from '../../Utils/password-input/password-input.component';
import { AuthService } from '../../../Services/Auth/auth.service';
import { Credentials } from '../../../Interfaces/credentials';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, ModalComponent, ReactiveFormsModule, PasswordInputComponent],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent implements OnInit {
  title: string = 'Inicia sesión';
  buttonText: string = 'Iniciar sesión';
  loginForm!: FormGroup;
  username: string = '';
  isDisabled: boolean = true;
  hasError: boolean = false;
  loginMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.loginForm.valueChanges.subscribe(() => this.checkIfDisabled());
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  checkIfDisabled() {
    if (this.email && this.password) {
      this.isDisabled = !(this.email.valid && this.password.valid);
    }
  }

  modalButtonAction = () => {
    this.submit();
  }

  submit() {
    if (this.loginForm.valid) {
      const credentials: Credentials = {
        email: this.email?.value,
        password: this.password?.value
      }

      this.authService.login(credentials).subscribe({
        next: x => {
          console.log(x);
          this.hasError = false;
          this.loginMessage = 'Accediendo!';
          setTimeout(() => this.modalService.closeModal('login'), 500);
        },
        error: error => {
          console.error(error);
          this.hasError = true;
          this.loginMessage = error;
        }
      });
    }
  }
}
