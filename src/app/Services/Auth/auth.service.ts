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
  isLogged$ = this.isLogged.asObservable();

  login(credentials: Credentials) {
    return this.usersService.login(credentials).pipe(tap({
      next: (x: any) => {
        console.log(x);
        const { token, role, client_id, business_id } = x;
        this.setUserSession(token, role, client_id, business_id);
        this.isLogged.next(true);
      }
    }));
  }

  logout() {
    sessionStorage.clear();
    this.isLogged.next(false);
  }

  private setUserSession(token: string, role: string, client_id: string, business_id: string) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('role', role);
    if (client_id) sessionStorage.setItem('client_id', client_id);
    if (business_id) sessionStorage.setItem('business_id', business_id);
  }

  private token() {
    return !!sessionStorage.getItem('token');
  }
}
