import { Component, OnDestroy, OnInit } from '@angular/core';
import { BusinessService } from '../../Services/Business/business.service';
import { Subscription } from 'rxjs';
import { Business } from '../../Interfaces/business';
import { EditableInformationItemComponent } from '../../Components/Utils/editable-information-item/editable-information-item.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from '../../Components/Utils/password-input/password-input.component';
import { ChangePasswordComponent } from '../../Components/Utils/change-password/change-password.component';

@Component({
  selector: 'app-business-profile',
  standalone: true,
  imports: [
    CommonModule,
    EditableInformationItemComponent,
    ChangePasswordComponent,
    NgxSkeletonLoaderModule
  ],
  templateUrl: './business-profile.component.html',
  styleUrl: './business-profile.component.scss'
})
export class BusinessProfileComponent implements OnInit, OnDestroy {

  subscription!: Subscription;
  information!: Object;
  isLoading: boolean = false;

  constructor(private businessService: BusinessService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getBusinessInformation();
  }

  getBusinessInformation() {
    const business_id = sessionStorage.getItem('business_id');
    if (business_id) {
      this.subscription = this.businessService.getBusinessById(+business_id).subscribe(info => {
        this.simplifyBusinessInformation(info);
        this.isLoading = false;
      });
    }
  }

  simplifyBusinessInformation(obj: Business) {
    const { name, address, phone, usuario: { email } } = obj;
    const newObject = { name, address, phone, email };
    this.information = newObject;
  }

  getObjectEntries() {
    if (this.information) return Object.entries(this.information);
    else return null;
  }

  translateLabel(label: string) : string {
    switch(label) {
      case 'name':
        return 'Nombre del negocio';
      case 'address':
        return 'Dirección';
      case 'phone':
        return 'Teléfono';
      case 'email':
        return 'Correo electrónico';
      default:
        return '';
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
