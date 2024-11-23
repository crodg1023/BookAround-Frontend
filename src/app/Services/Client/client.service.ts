import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Client } from '../../Interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private BASE_URL: string = 'http://bookaround-backend.lo/api/customers';

  constructor(private http: HttpClient) { }

  getAllClients() : Observable<Client[]> {
    return this.http.get<Client[]>(this.BASE_URL).pipe(retry(2), catchError(this.error));
  }

  getClientById(id: number) : Observable<Client> {
    return this.http.get<Client>(`${this.BASE_URL}/${id}`).pipe(retry(2), catchError(this.error));
  }

  postNewClient(clientInfo: Client) {
    return this.http.post<Client>(this.BASE_URL, clientInfo).pipe(catchError(this.error));
  }

  updateClientInformation(id: number, clientInfo: { name: string }) {
    return this.http.put(`${this.BASE_URL}/${id}`, clientInfo).pipe(catchError(this.error));
  }

  private error(error: HttpErrorResponse) {
    if (error.status === 0) return throwError(() => new Error('No ha sido posible establecer conexion'));
    else return throwError(() => new Error(error.error.errors));
  }
}
