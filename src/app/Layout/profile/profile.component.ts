import { Component, OnInit } from '@angular/core';
import { PlacesInputAutocompleteComponent } from '../../Components/Utils/places-input-autocomplete/places-input-autocomplete.component';
import { PasswordInputComponent } from '../../Components/Utils/password-input/password-input.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PlacesInputAutocompleteComponent, PasswordInputComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  userInformationForm!: FormGroup;
  passwordsMatches: boolean = true;
  isClient: boolean = true;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.userInformationForm = this.fb.group({
      name: '',
      email: ['', Validators.email],
      phone: [''],
      address: '',
      password: ''
    });
  }

  get name() { return this.userInformationForm.get('name'); }
  get email() { return this.userInformationForm.get('email'); }
  get phone() { return this.userInformationForm.get('phone'); }
  get address() { return this.userInformationForm.get('address'); }
  get password() { return this.userInformationForm.get('password'); }

  checkIfPasswordsMatches(value: string) {
    this.passwordsMatches = value.toLocaleLowerCase().trim() === this.password?.value;
  }

  checkIfValid() {
    return !this.userInformationForm.valid || !this.passwordsMatches || !this.userInformationForm.dirty;
  }

  onSubmit() {
    console.log(this.userInformationForm.getRawValue());
  }
}
