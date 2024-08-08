import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './Components/Modals/modal/modal.component';
import { LoginModalComponent } from './Components/Modals/login-modal/login-modal.component';
import { ClientRegisterComponent } from './Components/Modals/client-register/client-register.component';
import { BusinessRegisterComponent } from './Components/Modals/business-register/business-register.component';
import { HomeComponent } from './Views/home/home.component';
import { FiltersModalComponent } from './Components/Modals/filters-modal/filters-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ModalComponent, LoginModalComponent, ClientRegisterComponent, BusinessRegisterComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BookAroundFrontend';
}
