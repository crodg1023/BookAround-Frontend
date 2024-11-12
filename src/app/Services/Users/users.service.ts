import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Credentials } from '../../Interfaces/credentials';
import { User } from '../../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private BASE_URL: string = 'http://bookaround-backend.lo/api'

  constructor(private http: HttpClient) { }

  login(credentials: Credentials) {
    return this.http.post<Credentials>(`${this.BASE_URL}/login`, credentials).pipe(catchError(this.error));
  }

  getUsers() : Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/users`).pipe(retry(2), catchError(this.error));
  }

  postNewUser(userInfo: User) {
    return this.http.post<User>(`${this.BASE_URL}/users`, userInfo).pipe(catchError(this.error));
  }

  updateUserInformation(data: any, id: number) {
    return this.http.put<any>(`${this.BASE_URL}/users/${id}`, data).pipe(catchError(this.error));
  }

  private error(error: HttpErrorResponse) {
    if (error.status === 0) return throwError(() => new Error('No ha sido posible establecer conexion'));
    else return throwError(() => new Error(JSON.stringify(error.error, null, 2)));
  }
}
