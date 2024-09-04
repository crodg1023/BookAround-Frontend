import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Review } from '../../Interfaces/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private URL: string = 'http://bookaround-backend.lo/api/reviews';

  constructor(private http: HttpClient) { }

  getAllReviews() : Observable<Review[]> {
    return this.http.get<Review[]>(this.URL).pipe(retry(2), catchError(this.error));
  }

  postNewReview(review: Review) {
    return this.http.post<Review>(this.URL, review).pipe(catchError(this.error));
  }

  private error(error: HttpErrorResponse) {
    if (error.status === 0) return throwError(() => new Error('No ha sido posible establecer conexion'));
    else return throwError(() => new Error(error.error.message));
  }
}
