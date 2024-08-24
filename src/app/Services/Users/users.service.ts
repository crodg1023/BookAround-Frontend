import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private URL: string = 'http://bookaround-backend.lo/api/users'

  constructor(private http: HttpClient) { }

  getUsers() : Observable<any> {
    return this.http.get<any>(this.URL).pipe(retry(2), catchError(this.error));
  }

  private error(error: HttpErrorResponse) {
    if (error.status === 0) return throwError(() => new Error('No ha sido posible establecer conexion'));
    else return throwError(() => new Error(error.error));
  }
}
