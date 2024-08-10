import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-stars.component.html',
  styleUrl: './rating-stars.component.scss'
})
export class RatingStarsComponent {

  @Output() rate: EventEmitter<number> = new EventEmitter();
  rating: number = 0;
  hoverRating: number = 0;
  maxRating: number = 5;
  stars = Array(this.maxRating);
  colorClassName: string = 'p6-text';

  setRate(rating: number) {
    this.rating = rating;
    this.rate.emit(rating);
  }
  setHoverRating(rating: number) {
    this.colorClassName = 'p5-text';
    this.hoverRating = rating;
  }
  resetHover() {
    this.hoverRating = 0;
  }
}
