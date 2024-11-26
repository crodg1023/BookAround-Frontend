import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ComponentRef, ElementRef, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Review } from '../../../Interfaces/review';
import { StarsService } from '../../../Services/Stars/stars.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ReportModalComponent } from '../../Modals/report-modal/report-modal.component';
import { ModalService } from '../../../Services/modal.service';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [
    CommonModule,
    NgxSkeletonLoaderModule,
    ReportModalComponent
  ],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss'
})
export class ReviewCardComponent implements AfterViewInit {

  @ViewChild('reviewContent') reviewContent!: ElementRef;
  @ViewChild('reportContainer', { read: ViewContainerRef, static: true })
  reportContainer!: ViewContainerRef;
  reportComponentRef!: ComponentRef<ReportModalComponent>
  @Input() review!: Review;
  @Input() isLoading!: boolean;
  isTruncated: boolean = false;
  isExpanded: boolean = false;

  constructor(
    private starsService: StarsService,
    private modalService: ModalService
  ) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.checkIfTruncated());
  }

  openReportModal(type: 'customer' | 'review') {
    this.reportContainer.clear();
    this.createReportModal(type);
  }

  createReportModal(type: 'customer' | 'review') {
    console.log(this.review);

    this.reportComponentRef = this.reportContainer.createComponent(ReportModalComponent);
    this.reportComponentRef.instance.type = type;

    if (type === 'customer') {
      this.reportComponentRef.instance.reportableID = this.review.client?.id ?? 0;
    } else {
      this.reportComponentRef.instance.reportableID = this.review.id ?? 0;
    }

    this.modalService.openModal('report');
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
