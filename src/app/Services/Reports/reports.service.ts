import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../../Interfaces/client';
import { catchError, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private BaseUrl: string = 'http://bookaround-backend.lo/api/reportes';

  constructor(private http: HttpClient) { }

  getReportedCustomers() {
    return this.http.get<any[]>(`${this.BaseUrl}/customers`).pipe(retry(2), catchError(this.error));
  }

  getReportedBusiness() {
    return this.http.get<any[]>(`${this.BaseUrl}/companies`).pipe(retry(2), catchError(this.error));
  }

  getReportedReviews() {
    return this.http.get<any[]>(`${this.BaseUrl}/reviews`).pipe(retry(2), catchError(this.error));
  }

  createReport(report: any) {
    return this.http.post('http://bookaround-backend.lo/api/reports', report).pipe(catchError(this.error));
  }

  private error(error: HttpErrorResponse) {
    if (error.status === 0) return throwError(() => new Error('No ha sido posible establecer conexion'));
    else return throwError(() => new Error(JSON.stringify(error.error, null, 2)));
  }
}
