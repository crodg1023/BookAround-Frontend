import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ComponentRef, ElementRef, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Review } from '../../../Interfaces/review';
import { StarsService } from '../../../Services/Stars/stars.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ReportModalComponent } from '../../Modals/report-modal/report-modal.component';
import { ModalService } from '../../../Services/modal.service';
import { AuthService } from '../../../Services/Auth/auth.service';
import { ImageService } from '../../../Services/Images/image.service';

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
export class ReviewCardComponent implements AfterViewInit, OnInit {

  @ViewChild('reviewContent') reviewContent!: ElementRef;
  @ViewChild('reportContainer', { read: ViewContainerRef, static: true })
  reportContainer!: ViewContainerRef;
  reportComponentRef!: ComponentRef<ReportModalComponent>
  @Input() review!: Review;
  @Input() isLoading!: boolean;
  isTruncated: boolean = false;
  isExpanded: boolean = false;
  userRole: string = '';
  imageSrc: string = 'assets/images/profile-placeholder.jpg';

  constructor(
    private starsService: StarsService,
    private modalService: ModalService,
    private authService: AuthService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.getImageSrc();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.checkIfTruncated());
  }

  checkUserRole() {
    this.authService.userRole$.subscribe(x => this.userRole = x);
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

  getImageSrc() {
    if(this.review.client?.picture) {
      this.imageSrc = this.review.client.picture;
    } else {
      this.loadUserImage();
    }
  }

  loadUserImage() {
    const id = this.review.client?.id
    this.imageService.getCustomerImage(id ?? -1).subscribe(x => {
      this.imageSrc = URL.createObjectURL(x);
    });
  }
}
