import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from '../../Services/Client/client.service';
import { Subscription } from 'rxjs';
import { Client } from '../../Interfaces/client';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { EditableInformationItemComponent } from '../../Components/Utils/editable-information-item/editable-information-item.component';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from '../../Components/Utils/change-password/change-password.component';
import { UpdateProfilePictureComponent } from '../../Components/Utils/update-profile-picture/update-profile-picture.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordInputComponent } from '../../Components/Utils/password-input/password-input.component';
import { UsersService } from '../../Services/Users/users.service';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    EditableInformationItemComponent,
    ChangePasswordComponent,
    UpdateProfilePictureComponent,
    PasswordInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.scss'
})
export class CustomerProfileComponent implements OnInit, OnDestroy {

  subscription!: Subscription;
  updateForm!: FormGroup;
  customer!: Client;
  information!: Object;
  picture!: string;
  isLoading: boolean = false;

  constructor(
    private clientsService: ClientService,
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getClientInformation();
  }

  get name() {
    return this.updateForm.get('name');
  }
  get email() {
    return this.updateForm.get('email');
  }
  get password() {
    return this.updateForm.get('password');
  }

  defineUpdateForm() {
    if (this.customer) {
      this.updateForm = this.formBuilder.group({
        name: this.customer.name,
        email: [this.customer.user?.email, Validators.email],
        password: ''
      });
    }
  }

  getClientInformation() {
    const client_id = sessionStorage.getItem('client_id');
    if (client_id) {
      this.subscription = this.clientsService.getClientById(+client_id).subscribe(info => {
        this.customer = info;
        this.isLoading = false;
        this.defineUpdateForm();
      });
    }
  }

  updateInformation() {
    const client_id = sessionStorage.getItem('client_id');
    if (client_id) {
      this.clientsService.updateClientInformation(+client_id, { name: this.name?.value }).subscribe(x => console.log(x));
    }

    if (this.email?.valid) {
      const data: any = {
        email: this.email.value
      }

      if (this.password?.value) {
        data.password = this.password.value
      }

      this.usersService.updateUserInformation(data, this.customer.user?.id || 0).subscribe(x => console.log(x));
    }
  }

  saveChanges(e: Event) {
    e.preventDefault();
    console.log('guardando');
  }

  getValuesChanged(value: string) {
    console.log(value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
