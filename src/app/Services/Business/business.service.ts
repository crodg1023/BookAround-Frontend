import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Business } from '../../Interfaces/business';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private URL: string = 'http://bookaround-backend.lo/api/companies';
  private categoriesURL: string = 'http://bookaround-backend.lo/api/business-categories';

  constructor(private http: HttpClient) { }

  getAllBusiness() : Observable<Business[]> {
    return this.http.get<Business[]>(this.URL).pipe(retry(2), catchError(this.error));
  }

  getBusinessById(id: number) : Observable<Business> {
    return this.http.get<Business>(`${this.URL}/${id}`).pipe(retry(2), catchError(this.error));
  }

  postNewBusiness(businessInfo: Business) {
    return this.http.post<Business>(this.URL, businessInfo).pipe(catchError(this.error));
  }

  postBusinessCategories(categories: any) {
    return this.http.post<any>(this.categoriesURL, categories).pipe(catchError(this.error));
  }

  updateBusiness(info: any, id: number) {
    return this.http.put(`${this.URL}/${id}`, info).pipe(catchError(this.error));
  }

  deleteBusiness(id: number) {
    return this.http.delete(`${this.URL}/${id}`).pipe(catchError(this.error));
  }

  private error(error: HttpErrorResponse) {
    if (error.status === 0) return throwError(() => new Error('No ha sido posible establecer conexion'));
    else return throwError(() => new Error(JSON.stringify(error.error, null, 2)));
  }
}
