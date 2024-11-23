import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../Services/Reports/reports.service';
import { ReportedReviewCardComponent } from '../../Components/Utils/reported-review-card/reported-review-card.component';

@Component({
  selector: 'app-reported-reviews',
  standalone: true,
  imports: [
    ReportedReviewCardComponent
  ],
  templateUrl: './reported-reviews.component.html',
  styleUrl: './reported-reviews.component.scss'
})
export class ReportedReviewsComponent implements OnInit {

  reportedReviews: any[] = [];

  constructor(
    private reportsService: ReportsService
  ) {}

  ngOnInit(): void {
    this.fetchReportedReviews();
  }

  fetchReportedReviews() {
    this.reportsService.getReportedReviews().subscribe(x => this.reportedReviews = x);
  }

  groupReportsByReviews() {
    const reportsMap = new Map<number, { review: any, count: number }>();

    this.reportedReviews.forEach(review => {
      const id = review.reportable.id;

      if (reportsMap.has(id)) {
        reportsMap.get(id)!.count++;
      } else {
        reportsMap.set(id, { review, count: 1 });
      }
    });

    return [...reportsMap.values()];
  }

}
