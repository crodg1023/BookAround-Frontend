import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../Layout/navbar/navbar.component';
import { FooterComponent } from '../../Layout/footer/footer.component';
import { AdminSideBarComponent } from '../../Layout/admin-side-bar/admin-side-bar.component';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    AdminSideBarComponent
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss'
})
export class AdminPanelComponent {

}
