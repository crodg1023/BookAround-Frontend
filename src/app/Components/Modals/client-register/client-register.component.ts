import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../../../Services/modal.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from '../../Utils/password-input/password-input.component';
import { User } from '../../../Interfaces/user';
import { Client } from '../../../Interfaces/client';
import { UsersService } from '../../../Services/Users/users.service';
import { ClientService } from '../../../Services/Client/client.service';
import { switchMap } from 'rxjs';

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

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private clientService: ClientService
  ) {}

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
    const userInfo: User = {
      email: this.email?.value,
      password: this.password?.value,
      role_id: 1
    }

    this.usersService.postNewUser(userInfo).pipe(
      switchMap(newUser => {
        const clientInfo: Client = {
          name: this.name?.value,
          usuario_id: newUser.id
        };

        return this.clientService.postNewClient(clientInfo).pipe(
          switchMap(newClient => {
            const data = {
              cliente_id: newClient.id
            };

            return this.usersService.updateUserInformation(data, newClient.usuario_id || 0);
          })
        );
      })
    ).subscribe({
      next: result => console.log(result),
      error: error => console.error(error)
    });
  }
}
