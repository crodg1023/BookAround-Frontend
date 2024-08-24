import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginModalComponent } from './Components/Modals/login-modal/login-modal.component';
import { ClientRegisterComponent } from './Components/Modals/client-register/client-register.component';
import { BusinessRegisterComponent } from './Components/Modals/business-register/business-register.component';
import { UsersService } from './Services/Users/users.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginModalComponent, ClientRegisterComponent, BusinessRegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private users: UsersService) {
    this.users.getUsers().subscribe(data => console.log(data));
  }
}
