import { CommonModule } from '@angular/common';
import { Component, ElementRef } from '@angular/core';
import { LoginModalComponent } from '../../Modals/login-modal/login-modal.component';
import { ClientRegisterComponent } from '../../Modals/client-register/client-register.component';
import { BusinessRegisterComponent } from '../../Modals/business-register/business-register.component';
import { ModalService } from '../../../Services/modal.service';
import { ModalTypes } from '../../../Interfaces/modal-types';

@Component({
  selector: 'app-user-menu-button',
  standalone: true,
  imports: [CommonModule, LoginModalComponent, ClientRegisterComponent, BusinessRegisterComponent],
  templateUrl: './user-menu-button.component.html',
  styleUrl: './user-menu-button.component.scss'
})
export class UserMenuButtonComponent {
  isOpen: boolean = false;
  isVisible: boolean = false;

  constructor(private eRef: ElementRef, private modalService: ModalService) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;
    setTimeout(() => {
      this.isVisible = !this.isVisible;
    }, 100);
  }

  onLoginClick() {
    this.modalService.openModal(ModalTypes.Login);
    this.isOpen = false;
    this.isVisible = false;
  }
  onClientRegisterClick() {
    this.modalService.openModal(ModalTypes.ClientRegister);
    this.isOpen = false;
    this.isVisible = false;
  }
  onBusinessRegisterClick() {
    this.modalService.openModal(ModalTypes.BusinessRegister);
    this.isOpen = false;
    this.isVisible = false;
  }


  /*
  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
    */
}
