import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent implements OnInit, OnDestroy {
  showProfilePictureButtons: boolean = true;
  isClient: boolean = true;
  subscription!: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.router.events.subscribe(() => this.hiddenProfilePicture());
  }

  hiddenProfilePicture() {
    this.showProfilePictureButtons = this.router.url === '/control-panel/profile';
  }

  onProfileClick() { this.router.navigate(['control-panel/profile']); }
  onAppointmentsClick() { this.router.navigate(['control-panel/appointments']); }
  onAnalyticsClick() { this.router.navigate(['control-panel/analytics']); }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
