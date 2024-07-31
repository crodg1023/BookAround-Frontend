import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from '../../../Services/modal.service';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './login-modal.component.html',
  styleUrl: './login-modal.component.scss'
})
export class LoginModalComponent implements OnInit {
  title: string = 'Inicia sesión';
  buttonText: string = 'Iniciar sesión';
  showPassword: boolean = false;
  loginForm: FormGroup;
  username: string = '';

  constructor(private fb: FormBuilder, private modalService: ModalService) {
    this.loginForm = this.fb.group({
      //passwordInput: [''],
    });
  }

  ngOnInit(): void {
    //this.loginForm.get()
  }

  toggleShowPassword(e: Event) {
    e.preventDefault();
    this.showPassword = !this.showPassword;
  }

  modalButtonAction() {
    alert('Sesion iniciada!');
    this.modalService.closeModal('login');
  }
}
