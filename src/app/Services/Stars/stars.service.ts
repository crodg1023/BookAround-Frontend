import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StarsService {

  constructor() { }

  getScoreStars(score: number) : string[] {
    const fullStars = Math.round(score);
    const stars = Array(5).fill('fa-regular fa-star');
    for (let i = 0; i < fullStars; i++) {
      stars[i] = 'fa-solid fa-star';
    }
    return stars;
  }
}
