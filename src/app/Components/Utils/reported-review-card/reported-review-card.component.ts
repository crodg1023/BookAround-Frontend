import { Component, Input, OnInit } from '@angular/core';
import { DateTime } from 'luxon';
import { StarsService } from '../../../Services/Stars/stars.service';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../../Services/Client/client.service';
import { Client } from '../../../Interfaces/client';
import { ReviewService } from '../../../Services/Review/review.service';

@Component({
  selector: 'app-reported-review-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './reported-review-card.component.html',
  styleUrl: './reported-review-card.component.scss'
})
export class ReportedReviewCardComponent implements OnInit {

  @Input() reportedReview: any;
  @Input() count: number = 0;
  isLoading = false;
  reportedReviewAuthor!: Client;
  src: string = 'assets/images/profile-placeholder.jpg'

  constructor(
    private starsService: StarsService,
    private clientService: ClientService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.fetchClientInfo();
  }

  get parsedDate() {
    return DateTime.fromISO(this.reportedReview.created_at).toFormat('dd/MM/yyyy');
  }
  get scoreStars() {
    return this.starsService.getScoreStars(this.reportedReview.reportable.score);
  }

  fetchClientInfo() {
    this.isLoading = true;
    this.clientService.getClientById(+this.reportedReview.reportable.cliente_id || 0).subscribe(x => {
      this.reportedReviewAuthor = x;
      this.isLoading = false;
    });
  }

  deleteReview() {

  }
}
