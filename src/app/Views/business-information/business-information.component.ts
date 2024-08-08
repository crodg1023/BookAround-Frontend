import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Business } from '../../Interfaces/business';
import { Title } from '@angular/platform-browser';
import { CategoryIconsService } from '../../Services/Icons/category-icons.service';
import { ReviewCardComponent } from '../../Components/Utils/review-card/review-card.component';
import { CalendarComponent } from '../../Components/Utils/calendar/calendar.component';

@Component({
  selector: 'app-business-information',
  standalone: true,
  imports: [CommonModule, ReviewCardComponent, CalendarComponent],
  templateUrl: './business-information.component.html',
  styleUrl: './business-information.component.scss'
})
export class BusinessInformationComponent implements OnInit, AfterViewInit {
  @ViewChild('description') businessDescription!: ElementRef;
  business!: Business;
  isTruncated: boolean = false;
  isExpanded: boolean = false;

  constructor(private route: ActivatedRoute, private titleService: Title, private categoriesService: CategoryIconsService) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ businessInformation }) => this.business = businessInformation);
    this.titleService.setTitle(`${this.business.name} | Book Around`);
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.checkIfIsTruncated());
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

  checkIfIsTruncated() {
    const description = this.businessDescription.nativeElement;
    if (description.scrollHeight > description.clientHeight) this.isTruncated = true;
  }

  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }
}
