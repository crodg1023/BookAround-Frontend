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

@Component({
  selector: 'app-business-information',
  standalone: true,
  imports: [
    CommonModule,
    ReviewCardComponent,
    CalendarComponent,
    ReviewModalComponent,
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
  business!: Business;
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

  constructor (
    private route: ActivatedRoute,
    private titleService: Title,
    private categoriesService: CategoryIconsService,
    private modalService: ModalService,
    private geocodeSerivce: GeoCodingService,
    private reviewsService: ReviewService,
    private starsService: StarsService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this. subscriptions.push(
      this.route.data.subscribe(({ businessInformation }) => this.business = businessInformation),
      this.reviewsService.getAllReviews().subscribe(reviews => {
        this.reviews = reviews.filter(x => x.comercio_id === this.business.id);
        this.hasReviews = this.reviews.length > 0;
        this.showMoreReviews();
        this.isLoading = false;
      })
    );
    this.titleService.setTitle(`${this.business.name} | Book Around`);
    this.getAddressCoordinates();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.checkIfIsTruncated());
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
    return this.starsService.getScoreStars(this.business.score);
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

  openReviewModal() {
    this.reviewContainer.clear();
    this.componentRef = this.reviewContainer.createComponent(ReviewModalComponent);
    if (this.business.id) this.componentRef.instance.business_id = this.business.id;
    this.modalService.openModal('review');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
