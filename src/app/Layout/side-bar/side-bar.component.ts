import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientService } from '../../Services/Client/client.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Client } from '../../Interfaces/client';
import { Business } from '../../Interfaces/business';
import { BusinessService } from '../../Services/Business/business.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput') fileInput!: ElementRef;
  showProfilePictureButtons: boolean = true;
  isClient!: boolean;
  isLoading: boolean = false;
  subscription!: Subscription;
  clientInfo!: Client;
  businessInfo!: Business;

  constructor(
    private router: Router,
    private clientService: ClientService,
    private businessService: BusinessService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.router.events.subscribe(() => this.hiddenProfilePicture());
    this.checkUserRole();
    this.getUserInformation();
  }

  hiddenProfilePicture() {
    this.showProfilePictureButtons = this.router.url === '/control-panel/profile';
  }

  onProfileClick() { this.router.navigate(['control-panel/profile']); }
  onAppointmentsClick() { this.router.navigate(['control-panel/appointments']); }
  onAnalyticsClick() { this.router.navigate(['control-panel/analytics']); }

  checkUserRole() {
    sessionStorage.getItem('role') === 'customer' ? this.isClient = true : this.isClient = false;
  }

  getUserInformation() {
    if (this.isClient) {
      const client_id = sessionStorage.getItem('client_id');
      if (client_id) {
        this.clientService.getClientById(+client_id).subscribe(info => {
          this.clientInfo = info;
          this.isLoading = false;
        });
      }
    } else {
      const business_id = sessionStorage.getItem('business_id');
      if (business_id) {
        this.businessService.getBusinessById(+business_id).subscribe(info => {
          this.businessInfo = info;
          this.isLoading = false;
        });
      }
    }
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.uploadProfilePicture(file);
    }
  }

  uploadProfilePicture(file: File) {
    const formData = new FormData();
    formData.append('picture', file);
    console.log(formData.get('picture'));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
