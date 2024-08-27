import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-panel-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-panel-tabs.component.html',
  styleUrl: './control-panel-tabs.component.scss'
})
export class ControlPanelTabsComponent {

  activeTab: string = 'summary';

  constructor(private router: Router) {}

  onAccountSummaryClick() {
    this.router.navigate(['/control-panel']);
    this.activeTab = 'summary';
  }
  onProfileClick() {
    this.router.navigate(['/control-panel/profile']);
    this.activeTab = 'profile';
  }
  onAppointmentsClick() {
    this.router.navigate(['/control-panel/appointments']);
    this.activeTab = 'appointments';
  }
  onAnalyticsClick() {
    this.router.navigate(['/control-panel/analytics']);
    this.activeTab = 'analytics';
  }
}
