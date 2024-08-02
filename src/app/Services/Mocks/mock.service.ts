import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Business } from '../../Interfaces/business';

@Injectable({
  providedIn: 'root'
})
export class MockService {
  private mocksUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getBusiness() : Observable<Business[]> {
    return this.http.get<Business[]>(`${this.mocksUrl}/business`).pipe(retry(2), catchError(this.error));
  }

  getBusinessById(id: number) : Observable<Business> {
    return this.http.get<Business>(`${this.mocksUrl}/business/${id}`).pipe(retry(2), catchError(this.error));
  }

  private error(error: HttpErrorResponse) {
    if (error.status === 0) return throwError(() => new Error('No ha sido posible establecer conexion'));
    else return throwError(() => new Error(error.error));
  }
}
