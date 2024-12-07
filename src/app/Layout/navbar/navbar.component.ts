import { Component, Input, OnInit } from '@angular/core';
import { UserMenuButtonComponent } from '../../Components/Utils/user-menu-button/user-menu-button.component';
import { Router } from '@angular/router';
import { ScrollService } from '../../Services/Scroll/scroll.service';
import { SearchBarComponent } from '../../Components/Utils/search-bar/search-bar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [UserMenuButtonComponent, SearchBarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  @Input() isAtHome: boolean = false;
  isDarkMode: boolean = false;

  constructor(private router: Router, private scrollService: ScrollService) {}

  ngOnInit(): void {
    this.detectUserPreference();
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  scrollToAboutUs() {
    this.scrollService.scrollTo('about-us');
  }

  detectUserPreference() {
    const preference = localStorage.getItem('theme');
    if (preference) {
      this.isDarkMode = preference === 'dark';
    } else {
      this.isDarkMode = window.matchMedia('(prefers-color-schema: dark)').matches;
    }
    this.changeTheme();
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.changeTheme();
  }

  changeTheme() {
    const html = document.documentElement;
    this.isDarkMode ? html.classList.add('dark') : html.classList.remove('dark');
  }
}
