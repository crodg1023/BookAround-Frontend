import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Appointment } from '../../Interfaces/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private URL: string = 'http://bookaround-backend.lo/api/appointments';

  constructor(private http: HttpClient) { }

  getAllAppointments() : Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.URL).pipe(retry(2), catchError(this.error));
  }

  postNewAppointment(appointmentInfo: Appointment) {
    return this.http.post<Appointment>(this.URL, appointmentInfo).pipe(retry(2), catchError(this.error));
  }

  getCustomerAppointments(id: number) {
    return this.http.get<Appointment[]>(`${this.URL}/customers/${id}`).pipe(retry(2), catchError(this.error));
  }

  getBusinessAppointments(id: number) {
    return this.http.get<Appointment[]>(`${this.URL}/companies/${id}`).pipe(retry(2), catchError(this.error));
  }

  private error(error: HttpErrorResponse) {
    if (error.status === 0) return throwError(() => new Error('No ha sido posible establecer conexion'));
    else return throwError(() => new Error(error.error.message));
  }
}
