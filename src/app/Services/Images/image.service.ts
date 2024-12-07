import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private URL: string = 'http://bookaround-backend.lo/api/images';

  private imageUrl = new BehaviorSubject<string>('/assets/images/profile-placeholder.jpg');
  imageUrl$ = this.imageUrl.asObservable();

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

  getBusinessImages(id: number) {
    return this.http.get<any>(`http://bookaround-backend.lo/api/companies/${id}/images`).pipe(catchError(this.error));
  }

  deleteCustomerImage(id: number) {
    return this.http.delete<any>(`http://bookaround-backend.lo/api/delete-image/${id}`).pipe(catchError(this.error));
  }

  deleteBusinessImage(id: number, name: string) {
    return this.http.delete<any>(`http://bookaround-backend.lo/api/delete-company-image/${id}/${name}`, ).pipe(catchError(this.error));
  }

  updateCustomerImage(id: number, image: FormData) {
    return this.http.post(`http://bookaround-backend.lo/api/update-image/${id}`, image).pipe(catchError(this.error));
  }

  updateUIWithNewImg(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl.next(reader.result as string)
    }

    reader.readAsDataURL(file);
  }

  updateUIDeleteImg() {
    this.imageUrl.next('/assets/images/profile-placeholder.jpg');
  }

  private error(error: HttpErrorResponse) {
    if (error.status === 0) return throwError(() => new Error('No ha sido posible establecer conexion'));
    else return throwError(() => new Error(JSON.stringify(error.error, null, 2)));
  }
}
