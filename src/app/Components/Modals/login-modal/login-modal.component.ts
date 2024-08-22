import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ModalService } from '../../../Services/modal.service';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from '../../Utils/password-input/password-input.component';

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
  loginForm: FormGroup;
  username: string = '';
  isDisabled: boolean = true;

  constructor(private fb: FormBuilder, private modalService: ModalService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
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
    this.modalService.closeModal('login');
  }

  submit() {
    console.log(this.loginForm.getRawValue());
  }
}
