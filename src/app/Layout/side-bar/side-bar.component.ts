import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientService } from '../../Services/Client/client.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Client } from '../../Interfaces/client';
import { Business } from '../../Interfaces/business';
import { BusinessService } from '../../Services/Business/business.service';
import { ImageService } from '../../Services/Images/image.service';

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
  src: string = 'assets/images/profile-placeholder.jpg';

  constructor(
    private router: Router,
    private clientService: ClientService,
    private businessService: BusinessService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.router.events.subscribe(() => this.hiddenProfilePicture());
    this.checkUserRole();
    this.getUserInformation();
    this.loadImg();
  }

  loadImg() {
    this.imageService.imageUrl$.subscribe(x => this.src = x);
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
      this.getCustomerInfo();
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

  getCustomerInfo() {
    const client_id = sessionStorage.getItem('client_id');
    if (client_id) {
      this.clientService.getClientById(+client_id).subscribe(info => {
        this.clientInfo = info;
        this.isLoading = false;
      });
      this.imageService.getCustomerImage(+client_id).subscribe(blob => {
        this.src = URL.createObjectURL(blob);
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
