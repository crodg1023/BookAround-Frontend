import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-side-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './admin-side-bar.component.html',
  styleUrl: './admin-side-bar.component.scss'
})
export class AdminSideBarComponent implements OnInit {

  showIlustration: boolean = false;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  checkIfShowIlustration() {

  }

  onReportedCustomersClick() {
    this.router.navigate(['admin/customers']);
  }
}
