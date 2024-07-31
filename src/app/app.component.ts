import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserMenuButtonComponent } from './Components/Utils/user-menu-button/user-menu-button.component';
import { ModalComponent } from './Components/Modals/modal/modal.component';
import { LoginModalComponent } from './Components/Modals/login-modal/login-modal.component';
import { ClientRegisterComponent } from './Components/Modals/client-register/client-register.component';
import { BusinessRegisterComponent } from './Components/Modals/business-register/business-register.component';
import { NavbarComponent } from './Layout/navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UserMenuButtonComponent, ModalComponent, LoginModalComponent, ClientRegisterComponent, BusinessRegisterComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'BookAroundFrontend';
  isModalOpen = false;

  modalButtonAction() {
    alert('Modal button clicked!');
  }

  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }
}
