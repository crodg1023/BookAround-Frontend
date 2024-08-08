import { Component } from '@angular/core';
import { UserMenuButtonComponent } from '../../Components/Utils/user-menu-button/user-menu-button.component';
import { Router } from '@angular/router';
import { ScrollService } from '../../Services/Scroll/scroll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [UserMenuButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(private router: Router, private scrollService: ScrollService) {}

  goToHome() {
    this.router.navigate(['/']);
  }

  scrollToAboutUs() {
    this.scrollService.scrollTo('about-us');
  }
}
