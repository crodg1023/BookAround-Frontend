import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from '../../../Interfaces/business';
import { CategoryIconsService } from '../../../Services/Icons/category-icons.service';

@Component({
  selector: 'app-business-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './business-card.component.html',
  styleUrl: './business-card.component.scss'
})
export class BusinessCardComponent {
  @Input() business!: Business
  @Input() isFeatured: boolean = false;
  images!: string[];
  src!: string;

  constructor(
    private router: Router,
    private categoriesService: CategoryIconsService,
  ) {}


  getSrc(): string {
    if (this.business.images?.length) {
      return this.business.images[0];
    }

    return this.business.pictures ?? 'assets/images/profile-placeholder.jpg';
  }

  onCardClick() {
    this.router.navigate(['/business/find', this.business.id]);
  }

  getFormattedHour(hour: number) {
    return hour.toString().split(':').slice(0, 2).join(':');
  }
}
