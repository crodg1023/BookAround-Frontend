import { Component, OnInit } from '@angular/core';
import { PlacesInputAutocompleteComponent } from '../../Components/Utils/places-input-autocomplete/places-input-autocomplete.component';
import { PasswordInputComponent } from '../../Components/Utils/password-input/password-input.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../Services/Client/client.service';
import { Client } from '../../Interfaces/client';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    PlacesInputAutocompleteComponent,
    PasswordInputComponent,
    ReactiveFormsModule,
    FormsModule,
    NgxSkeletonLoaderModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  userInformationForm!: FormGroup;
  passwordsMatches: boolean = true;
  isClient!: boolean;
  isLoading: boolean = false;
  isEditing: { [key: string]: boolean } = {
    name: false,
    email: false,
    address: false,
    phone: false
  }
  clientInformation!: Client;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userInformationForm = this.fb.group({
      name: '',
      email: ['', Validators.email],
      phone: [''],
      address: '',
      password: ''
    });
    this.getClientInformation();
    this.checkUserRole();
  }

  get name() { return this.userInformationForm.get('name'); }
  get email() { return this.userInformationForm.get('email'); }
  get phone() { return this.userInformationForm.get('phone'); }
  get address() { return this.userInformationForm.get('address'); }
  get password() { return this.userInformationForm.get('password'); }

  toggleEditing(field: string) {
    this.isEditing[field] = !this.isEditing[field];
  }

  checkIfPasswordsMatches(value: string) {
    this.passwordsMatches = value.toLocaleLowerCase().trim() === this.password?.value;
  }

  checkIfValid() {
    return !this.userInformationForm.valid || !this.passwordsMatches || !this.userInformationForm.dirty;
  }

  onSubmit() {
    console.log(this.userInformationForm.getRawValue());
  }

  checkUserRole() {
    sessionStorage.getItem('role') === 'customer' ? this.isClient = true : this.isClient = false;
  }

  getClientInformation() {
    const client_id = sessionStorage.getItem('client_id');
    if (client_id) {
      this.clientService.getClientById(+client_id).subscribe(info => {
        console.log(info);
        this.clientInformation = info;
        this.isLoading = false;
      });
    }
  }
}
