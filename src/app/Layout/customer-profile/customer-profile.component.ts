import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from '../../Services/Client/client.service';
import { Subscription } from 'rxjs';
import { Client } from '../../Interfaces/client';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { EditableInformationItemComponent } from '../../Components/Utils/editable-information-item/editable-information-item.component';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from '../../Components/Utils/change-password/change-password.component';
import { UpdateProfilePictureComponent } from '../../Components/Utils/update-profile-picture/update-profile-picture.component';

@Component({
  selector: 'app-customer-profile',
  standalone: true,
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    EditableInformationItemComponent,
    ChangePasswordComponent,
    UpdateProfilePictureComponent
  ],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.scss'
})
export class CustomerProfileComponent implements OnInit, OnDestroy {

  subscription!: Subscription;
  information!: Object;
  picture!: string;
  isLoading: boolean = false;

  constructor(private clientsService: ClientService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getClientInformation();
  }

  getClientInformation() {
    const client_id = sessionStorage.getItem('client_id');
    if (client_id) {
      this.subscription = this.clientsService.getClientById(+client_id).subscribe(info => {
        this.simplifyClientInformation(info);
        this.isLoading = false;
      });
    }
  }

  simplifyClientInformation(obj: Client) {
    const { name, picture, user } = obj;
    const email = user?.email;
    if (picture) this.picture = picture;
    const newObject = { name, email };
    this.information = newObject;
  }

  getObjectEntries() {
    if (this.information) {
      return Object.entries(this.information);
    } else {
      return null;
    }
  }

  translateLabel(label: string) : string {
    switch(label) {
      case 'name':
        return 'Nombre';
      case 'email':
        return 'Correo electrónico';
      default:
        return '';
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
