import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private URL: string = 'http://bookaround-backend.lo/api/images';

  constructor(private http: HttpClient) { }

  getAllImages() : Observable<any> {
    return this.http.get<any>(this.URL).pipe(retry(2), catchError(this.error));
  }

  postImage(data: FormData) : Observable<any> {
    return this.http.post<any>(this.URL, data).pipe(retry(2), catchError(this.error));
  }

  getCustomerImage(id: number) {
    return this.http.get<Blob>(`http://bookaround-backend.lo/api/customers/${id}/image`, { responseType: 'blob' as 'json' }).pipe(catchError(this.error));
  }

  private error(error: HttpErrorResponse) {
    if (error.status === 0) return throwError(() => new Error('No ha sido posible establecer conexion'));
    else return throwError(() => new Error(JSON.stringify(error.error, null, 2)));
  }
}
