import { CommonModule } from '@angular/common';
import { Component, ComponentRef, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { LoginModalComponent } from '../../Modals/login-modal/login-modal.component';
import { ClientRegisterComponent } from '../../Modals/client-register/client-register.component';
import { BusinessRegisterComponent } from '../../Modals/business-register/business-register.component';
import { ModalService } from '../../../Services/modal.service';
import { ModalTypes } from '../../../Interfaces/modal-types';
import { AuthService } from '../../../Services/Auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-menu-button',
  standalone: true,
  imports: [CommonModule, LoginModalComponent, ClientRegisterComponent, BusinessRegisterComponent],
  templateUrl: './user-menu-button.component.html',
  styleUrl: './user-menu-button.component.scss'
})
export class UserMenuButtonComponent implements OnInit, OnDestroy {

  @ViewChild('modalsContainer', { read: ViewContainerRef, static: true })
  dynamicContainer!: ViewContainerRef;
  private componentRef!: ComponentRef<LoginModalComponent | ClientRegisterComponent | BusinessRegisterComponent>;
  subscription!: Subscription;
  isOpen: boolean = false;
  isVisible: boolean = false;
  userHasLoggedIn!: boolean;

  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.authService.isLogged$.subscribe(value => this.userHasLoggedIn = value);
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    setTimeout(() => {
      this.isVisible = !this.isVisible;
    }, 100);
  }

  onLoginClick() {
    this.dynamicContainer.clear();
    this.componentRef = this.dynamicContainer.createComponent(LoginModalComponent);
    this.modalService.openModal(ModalTypes.Login);
    this.isOpen = false;
    this.isVisible = false;
  }
  onClientRegisterClick() {
    this.dynamicContainer.clear();
    this.componentRef = this.dynamicContainer.createComponent(ClientRegisterComponent);
    this.modalService.openModal(ModalTypes.ClientRegister);
    this.isOpen = false;
    this.isVisible = false;
  }
  onBusinessRegisterClick() {
    this.dynamicContainer.clear();
    this.componentRef = this.dynamicContainer.createComponent(BusinessRegisterComponent);
    this.modalService.openModal(ModalTypes.BusinessRegister);
    this.isOpen = false;
    this.isVisible = false;
  }
  onControlPanelClick() {
    this.router.navigate(['/control-panel']);
  }
  onProfileClick() {
    this.router.navigate(['/control-panel/profile']);
  }
  onLogoutClick() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
