import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-business-information',
  standalone: true,
  imports: [CommonModule, ReviewCardComponent, CalendarComponent, ReviewModalComponent, GoogleMapsModule],
  templateUrl: './business-information.component.html',
  styleUrl: './business-information.component.scss'
})
export class BusinessInformationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('description') businessDescription!: ElementRef;
  business!: Business;
  isTruncated: boolean = false;
  isExpanded: boolean = false;
  subscriptions: Subscription[] = [];
  center!: google.maps.LatLngLiteral;
  zoom: number = 15;
  mapOptions!: google.maps.MapOptions;
  markerOptions!: google.maps.marker.AdvancedMarkerElementOptions;

  constructor (
    private route: ActivatedRoute,
    private titleService: Title,
    private categoriesService: CategoryIconsService,
    private modalService: ModalService,
    private geocodeSerivce: GeoCodingService
  ) {}

  ngOnInit(): void {
    this. subscriptions.push(this.route.data.subscribe(({ businessInformation }) => this.business = businessInformation));
    this.titleService.setTitle(`${this.business.name} | Book Around`);
    this.getAddressCoordinates();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.checkIfIsTruncated());
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng !== null) this.center = event.latLng.toJSON();
  }

  getScoreStars() : string[] {
    const fullStars = Math.round(this.business.score);
    const stars = Array(5).fill('fa-regular fa-star');
    for (let i = 0; i < fullStars; i++) {
      stars[i] = 'fa-solid fa-star';
    }
    return stars;
  }

  getBusinessCategory() : string {
    return this.categoriesService.getCategoryIcon(this.business.category);
  }

  getAddressCoordinates() {
    this.subscriptions.push(this.geocodeSerivce.getCoordinates(this.business.address).subscribe((response: any) => {
      this.center = response.results[0].geometry.location;
      this.mapOptions = {
        center: this.center,
        zoom: this.zoom,
        streetViewControl: false
      }
      this.markerOptions = {
        position: this.center,
        title: this.business.name
      }
    }));
  }

  checkIfIsTruncated() {
    const description = this.businessDescription.nativeElement;
    if (description.scrollHeight > description.clientHeight) this.isTruncated = true;
  }

  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }

  openReviewModal() {
    this.modalService.openModal('review');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
