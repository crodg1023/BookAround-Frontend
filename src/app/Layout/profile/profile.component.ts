import { Component, OnInit } from '@angular/core';
import { BusinessProfileComponent } from '../business-profile/business-profile.component';
import { CustomerProfileComponent } from '../customer-profile/customer-profile.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    BusinessProfileComponent,
    CustomerProfileComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  isClient!: boolean;

  ngOnInit(): void {
    this.checkUserRole();
  }

  checkUserRole() {
    sessionStorage.getItem('role') === 'customer' ? this.isClient = true : this.isClient = false;
  }
}
