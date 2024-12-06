import { Component, OnDestroy, OnInit } from '@angular/core';
import { BusinessService } from '../../Services/Business/business.service';
import { Subscription } from 'rxjs';
import { Business } from '../../Interfaces/business';
import { EditableInformationItemComponent } from '../../Components/Utils/editable-information-item/editable-information-item.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from '../../Components/Utils/password-input/password-input.component';
import { ChangePasswordComponent } from '../../Components/Utils/change-password/change-password.component';
import { PlacesInputAutocompleteComponent } from '../../Components/Utils/places-input-autocomplete/places-input-autocomplete.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../Services/Users/users.service';
import { ImageService } from '../../Services/Images/image.service';

@Component({
  selector: 'app-business-profile',
  standalone: true,
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    PlacesInputAutocompleteComponent,
    PasswordInputComponent,
    ReactiveFormsModule
  ],
  templateUrl: './business-profile.component.html',
  styleUrl: './business-profile.component.scss'
})
export class BusinessProfileComponent implements OnInit, OnDestroy {

  subscription!: Subscription;
  updateBusinessForm!: FormGroup;
  business!: Business;
  information!: Object;
  isLoading: boolean = false;
  images: string[] = [];

  constructor(
    private businessService: BusinessService,
    private userService: UsersService,
    private formBuilder: FormBuilder,
    private imageService: ImageService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getBusinessInformation();
    this.getBusinessImages();
  }

  get name() {
    return this.updateBusinessForm.get('name');
  }
  get email() {
    return this.updateBusinessForm.get('email');
  }
  get phone() {
    return this.updateBusinessForm.get('phone');
  }
  get address() {
    return this.updateBusinessForm.get('address');
  }
  get password() {
    return this.updateBusinessForm.get('password');
  }

  getBusinessInformation() {
    const business_id = sessionStorage.getItem('business_id');
    if (business_id) {
      this.subscription = this.businessService.getBusinessById(+business_id).subscribe(info => {
        this.business = info;
        this.defineForm();
        this.isLoading = false;
      });
    }
  }

  defineForm() {
    this.updateBusinessForm = this.formBuilder.group({
      name: this.business.name,
      email: [this.business.user?.email, Validators.email],
      phone: [this.business.phone, Validators.pattern(/^\d+$/)],
      address: this.business.address,
      password: ''
    });
  }

  updateInfo() {
    const businessData = {
      name: this.name?.value,
      phone: this.phone?.value,
      address: this.address?.value,
    }

    const userData: any = {
      eamil: this.email?.value
    }

    if (this.password?.value) {
      userData.password = this.password.value;
    }

    if (this.updateBusinessForm.valid) {
      this.businessService.updateBusiness(businessData, this.business.id ?? 0).subscribe(x => console.log(x));
      this.userService.updateUserInformation(userData, this.business.user?.id ?? 0).subscribe(x => console.log(x));
    } else {
      console.log('no valido!');
    }
  }

  getBusinessImages() {
    const business_id = Number(sessionStorage.getItem('business_id'));
    this.imageService.getBusinessImages(business_id).subscribe(x => {
      this.images = x.images
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
