import { Component } from '@angular/core';
import { UserMenuButtonComponent } from '../../Components/Utils/user-menu-button/user-menu-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [UserMenuButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private router: Router) {}

  goToHome() {
    this.router.navigate(['/']);
  }
}
