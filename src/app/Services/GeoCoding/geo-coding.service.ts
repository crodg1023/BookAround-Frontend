import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoCodingService {
  private apiKey: string = 'AIzaSyCYLQXpKL9a3JIGgMKWaPrWa6mCDk2EwE4';
  private url: string = 'https://maps.googleapis.com/maps/api/geocode/json';

  constructor(private http: HttpClient) { }

  getCoordinates(address: string) {
    return this.http.get(`${this.url}?address=${encodeURIComponent(address)}&key=${this.apiKey}`);
  }
}
