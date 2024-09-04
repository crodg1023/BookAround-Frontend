import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Review } from '../../../Interfaces/review';
import { StarsService } from '../../../Services/Stars/stars.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [CommonModule, NgxSkeletonLoaderModule],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss'
})
export class ReviewCardComponent implements AfterViewInit {

  @ViewChild('reviewContent') reviewContent!: ElementRef;
  @Input() review!: Review;
  @Input() isLoading!: boolean;
  isTruncated: boolean = false;
  isExpanded: boolean = false;

  constructor(private starsService: StarsService) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.checkIfTruncated());
  }

  getFormattedDate() : string {
    if (this.review.published) {
      const date = new Date(this.review.published);
      return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return '';
  }
  getScoreStars() {
    return this.starsService.getScoreStars(this.review.score);
  }
  checkIfTruncated() {
    const content = this.reviewContent.nativeElement;
    if (content.scrollHeight > content.clientHeight) this.isTruncated = true;
  }
  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }
}
