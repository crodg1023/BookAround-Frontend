import { Component } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { RatingStarsComponent } from '../../Utils/rating-stars/rating-stars.component';
import { ModalService } from '../../../Services/modal.service';

@Component({
  selector: 'app-review-modal',
  standalone: true,
  imports: [ModalComponent, RatingStarsComponent],
  templateUrl: './review-modal.component.html',
  styleUrl: './review-modal.component.scss'
})
export class ReviewModalComponent {

  rating: number = 0;

  constructor(private modalService: ModalService) {}

  handleRating(rating: number) {
    this.rating = rating;
  }

  publishReview() {
    alert('Resena publicada!')
    this.modalService.closeModal('review');
  }
}
