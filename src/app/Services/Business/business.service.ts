import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Business } from '../../Interfaces/business';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private URL: string = 'http://bookaround-backend.lo/api/companies';

  constructor(private http: HttpClient) { }

  getAllBusiness() : Observable<Business[]> {
    return this.http.get<Business[]>(this.URL).pipe(retry(2), catchError(this.error));
  }

  getBusinessById(id: number) : Observable<Business> {
    return this.http.get<Business>(`${this.URL}/${id}`).pipe(retry(2), catchError(this.error));
  }

  private error(error: HttpErrorResponse) {
    if (error.status === 0) return throwError(() => new Error('No ha sido posible establecer conexion'));
    else return throwError(() => new Error(error.error.message));
  }
}
