import { Injectable } from '@angular/core';
import { UsersService } from '../Users/users.service';
import { BehaviorSubject, tap } from 'rxjs';
import { Credentials } from '../../Interfaces/credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private usersService: UsersService) { }

  private isLogged = new BehaviorSubject<boolean>(this.token());
  private userRole = new BehaviorSubject<string>(this.role() || '');
  isLogged$ = this.isLogged.asObservable();
  userRole$ = this.userRole.asObservable();

  login(credentials: Credentials) {
    return this.usersService.login(credentials).pipe(tap({
      next: (x: any) => {
        console.log(x);
        const { token, role, client_id, business_id, email } = x;
        this.userRole.next(role);
        this.setUserSession(token, role, client_id, business_id, email);
        this.isLogged.next(true);
      }
    }));
  }

  logout() {
    sessionStorage.clear();
    this.isLogged.next(false);
  }

  private setUserSession(token: string, role: string, client_id: string, business_id: string, email: string) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('email', email);
    if (client_id) sessionStorage.setItem('client_id', client_id);
    if (business_id) sessionStorage.setItem('business_id', business_id);
  }

  private token() {
    return !!sessionStorage.getItem('token');
  }

  private role() {
    return sessionStorage.getItem('role');
  }
}
