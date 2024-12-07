import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ComponentRef, ElementRef, OnDestroy, OnInit, signal, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Business } from '../../Interfaces/business';
import { Title } from '@angular/platform-browser';
import { CategoryIconsService } from '../../Services/Icons/category-icons.service';
import { ReviewCardComponent } from '../../Components/Utils/review-card/review-card.component';
import { CalendarComponent } from '../../Components/Utils/calendar/calendar.component';
import { ReviewModalComponent } from '../../Components/Modals/review-modal/review-modal.component';
import { ModalService } from '../../Services/modal.service';
import { GoogleMapsModule } from '@angular/google-maps';
import { Subscription } from 'rxjs';
import { GeoCodingService } from '../../Services/GeoCoding/geo-coding.service';
import { ReviewService } from '../../Services/Review/review.service';
import { Review } from '../../Interfaces/review';
import { StarsService } from '../../Services/Stars/stars.service';
import { LoginModalComponent } from '../../Components/Modals/login-modal/login-modal.component';
import { AuthService } from '../../Services/Auth/auth.service';
import { EchoService } from '../../Services/WebSockets/echo.service';
import { ScheduleAppointmentModalComponent } from '../../Components/Modals/schedule-appointment-modal/schedule-appointment-modal.component';
import { LoginToReviewModalComponent } from '../../Components/Modals/login-to-review-modal/login-to-review-modal.component';
import { ReportModalComponent } from '../../Components/Modals/report-modal/report-modal.component';
import { ImageService } from '../../Services/Images/image.service';

@Component({
  selector: 'app-business-information',
  standalone: true,
  imports: [
    CommonModule,
    ReviewCardComponent,
    CalendarComponent,
    ReviewModalComponent,
    ScheduleAppointmentModalComponent,
    ReportModalComponent,
    GoogleMapsModule
  ],
  templateUrl: './business-information.component.html',
  styleUrl: './business-information.component.scss'
})
export class BusinessInformationComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('description') businessDescription!: ElementRef;
  @ViewChild('reviewContainer', { read: ViewContainerRef, static: true })
  reviewContainer!: ViewContainerRef;
  componentRef!: ComponentRef<ReviewModalComponent>
  loginComponentRef!: ComponentRef<LoginToReviewModalComponent>
  scheduleAppointmentComponentRef!: ComponentRef<ScheduleAppointmentModalComponent>
  reportComponentRef!: ComponentRef<ReportModalComponent>
  business!: Business;
  userRole!: string;
  isTruncated: boolean = false;
  isExpanded: boolean = false;
  isLoading: boolean = false;
  hasReviews: boolean = false;
  subscriptions: Subscription[] = [];
  mapOptions!: google.maps.MapOptions;
  mapMarkerOptions!: google.maps.marker.AdvancedMarkerElementOptions;
  reviews!: Review[];
  displayedReviews: Review[] = [];
  count: number = 4;
  currentIndex = signal(0);
  images!: string[];
  src: string = '';
  currentImgIndex: number = 0;

  constructor (
    private route: ActivatedRoute,
    private titleService: Title,
    private modalService: ModalService,
    private geocodeSerivce: GeoCodingService,
    private reviewsService: ReviewService,
    private starsService: StarsService,
    private authService: AuthService,
    private echoService: EchoService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.fetchReviews();
    this.listenNewReviews();
    this.titleService.setTitle(`${this.business.name} | Book Around`);
    this.getAddressCoordinates();
    this.checkUserRole();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.checkIfIsTruncated());
  }

  fetchReviews() {
    this. subscriptions.push(
      this.route.data.subscribe(({ businessInformation }) => {
        this.business = businessInformation;
        this.changeImg();
      }),
      this.reviewsService.getAllReviews().subscribe(reviews => {
        this.reviews = reviews.filter(x => x.comercio_id === this.business.id);
        this.hasReviews = this.reviews.length > 0;
        this.showMoreReviews();
        this.isLoading = false;
      })
    );
  }

  checkUserRole() {
    this.authService.userRole$.subscribe(x => this.userRole = x);
  }

  listenNewReviews() {
    this.echoService.listenForNewReviews((newReview) => {
      if (newReview.comercio_id === this.business.id) {
        if (this.displayedReviews.length < 4 || this.displayedReviews.length < this.currentIndex()) {
          this.displayedReviews.push(newReview);
          this.reviews.push(newReview);
        } else {
          this.reviews.push(newReview);
        }
      }
    });
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng !== null) this.mapOptions.center = event.latLng.toJSON();
  }

  getAddressCoordinates() {
    this.subscriptions.push(this.geocodeSerivce.getCoordinates(this.business.address).subscribe((response: any) => {
      this.mapOptions = {
        center: response.results[0].geometry.location,
        zoom: 15,
        streetViewControl: false
      }
      this.mapMarkerOptions = {
        position: response.results[0].geometry.location,
        title: this.business.name
      }
    }));
  }

  getScoreStars() {
    return this.starsService.getScoreStars(this.business.score || 0);
  }

  checkIfIsTruncated() {
    const description = this.businessDescription.nativeElement;
    if (description.scrollHeight > description.clientHeight) this.isTruncated = true;
  }

  showMoreReviews() {
    const nextIndex = this.currentIndex() + this.count;
    this.displayedReviews = this.displayedReviews.concat(this.reviews.slice(this.currentIndex(), nextIndex));
    this.currentIndex.set(nextIndex);
  }

  resetDisplayedReviews() {
    this.displayedReviews = this.reviews.slice(0, this.count);
    this.currentIndex.set(this.count);
  }

  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }

  createReviewModal() {
    this.componentRef = this.reviewContainer.createComponent(ReviewModalComponent);
    if (this.business.id) this.componentRef.instance.business_id = this.business.id;
    this.modalService.openModal('review');
  }

  createScheduleAppointmentModal() {
    this.scheduleAppointmentComponentRef = this.reviewContainer.createComponent(ScheduleAppointmentModalComponent);
    if (this.business.id) this.scheduleAppointmentComponentRef.instance.businessId = this.business.id;
    this.modalService.openModal('appointmentSchedule');
  }

  createReportModal() {
    this.reportComponentRef = this.reviewContainer.createComponent(ReportModalComponent);
    this.reportComponentRef.instance.type = 'business';
    this.reportComponentRef.instance.reportableID = this.business.id ?? 0;
    this.modalService.openModal('report');
  }

  openReviewModal() {
    this.reviewContainer.clear();
    this.authService.isLogged$.subscribe(isLogged => {
      if (isLogged) {
        this.createReviewModal();
      } else {
        this.loginComponentRef = this.reviewContainer.createComponent(LoginToReviewModalComponent);
        this.modalService.openModal('loginToReview');
      }
    });
  }

  changeImg() {
    if (this.business.images?.length) {
      setInterval(() => {
        this.currentImgIndex++;
        if (this.currentImgIndex >= (this.business?.images?.length || 0)) {
          this.currentImgIndex = 0;
        }
        if (this.business.images) {
          this.src = this.business?.images[this.currentImgIndex];
        }
      }, 5000);
    }
  }

  openReportModal() {
    this.reviewContainer.clear();
    this.createReportModal();
  }

  openScheduleAppointmentModal() {
    this.reviewContainer.clear();
    this.createScheduleAppointmentModal();
  }

  getFormattedHour(hour: number) {
    return hour.toString().split(':').slice(0, 2).join(':');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
