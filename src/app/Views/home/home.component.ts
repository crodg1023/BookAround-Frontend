import { Component } from '@angular/core';
import { NavbarComponent } from '../../Layout/navbar/navbar.component';
import { HeroComponent } from '../../Layout/hero/hero.component';
import { FeaturedComponent } from '../../Layout/featured/featured.component';
import { FooterComponent } from '../../Layout/footer/footer.component';
import { AboutUsComponent } from '../../Layout/about-us/about-us.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, HeroComponent, FeaturedComponent, AboutUsComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
