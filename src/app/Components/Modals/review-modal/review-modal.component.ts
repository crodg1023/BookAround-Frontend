import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { RatingStarsComponent } from '../../Utils/rating-stars/rating-stars.component';
import { ModalService } from '../../../Services/modal.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-modal',
  standalone: true,
  imports: [CommonModule, ModalComponent, RatingStarsComponent, ReactiveFormsModule],
  templateUrl: './review-modal.component.html',
  styleUrl: './review-modal.component.scss'
})
export class ReviewModalComponent implements OnInit {

  rating: number = 0;
  isDisabled: boolean = true;
  reviewForm!: FormGroup;

  constructor(private modalService: ModalService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      content: ['', Validators.required]
    });
    this.reviewForm.valueChanges.subscribe(() => this.checkIfDisabled());
  }

  get content() { return this.reviewForm.get('content'); }

  handleRating(rating: number) {
    this.rating = rating;
  }

  checkIfDisabled() {
    if (this.content) {
      this.isDisabled = !this.content.valid;
    }
  }

  publishReview = () => {
    this.submit();
    this.modalService.closeModal('review');
  }

  submit() {
    const review = {
      content: this.reviewForm.get('content')?.value,
      score: this.rating
    }
    console.log(review);
  }
}
