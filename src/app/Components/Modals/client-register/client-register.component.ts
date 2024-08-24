import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../../../Services/modal.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from '../../Utils/password-input/password-input.component';

@Component({
  selector: 'app-client-register',
  standalone: true,
  imports: [CommonModule, ModalComponent, ReactiveFormsModule, PasswordInputComponent],
  templateUrl: './client-register.component.html',
  styleUrl: './client-register.component.scss'
})
export class ClientRegisterComponent implements OnInit {
  modalTitle: string = 'Regístrate';
  modalButtonText: string = 'Finalizar';
  clientRegtisterForm!: FormGroup;
  clientName: string = '@User';
  isDisabled: boolean = true;

  constructor(private modalService: ModalService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.clientRegtisterForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.clientRegtisterForm.get('name')?.valueChanges.subscribe(value => {
      if (value) this.clientName = `@${value}`;
      else this.clientName = '@User';
    });

    this.clientRegtisterForm.valueChanges.subscribe(() => this.checkIfValid());
  }

  get name() { return this.clientRegtisterForm.get('name'); }
  get email() { return this.clientRegtisterForm.get('email'); }
  get password() { return this.clientRegtisterForm.get('password'); }

  checkIfValid() {
    if (this.name && this.email && this.password) {
      this.isDisabled = !(this.name.valid && this.email.valid && this.password.valid);
    }
  }

  modalButtonAction() {
    this.submit();
    this.modalService.closeModal('clientRegister');
  }

  submit() {
    console.log(this.clientRegtisterForm.getRawValue());
  }
}
