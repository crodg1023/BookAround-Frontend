import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginModalComponent } from './Components/Modals/login-modal/login-modal.component';
import { ClientRegisterComponent } from './Components/Modals/client-register/client-register.component';
import { BusinessRegisterComponent } from './Components/Modals/business-register/business-register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginModalComponent, ClientRegisterComponent, BusinessRegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
