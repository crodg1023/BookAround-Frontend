import { Component, OnDestroy, OnInit } from '@angular/core';
import { BusinessCardComponent } from '../../Components/Utils/business-card/business-card.component';
import { MockService } from '../../Services/Mocks/mock.service';
import { CategoryFilterComponent } from '../../Components/Utils/category-filter/category-filter.component';
import { Business } from '../../Interfaces/business';
import { Subscription } from 'rxjs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [BusinessCardComponent, CategoryFilterComponent, NgxSkeletonLoaderModule],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.scss'
})
export class FeaturedComponent implements OnInit, OnDestroy {
  business: Business[] = [];
  featuredBusiness: Business[] = [];
  subscription!: Subscription;
  isLoading: boolean = false;

  constructor(private mockService: MockService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.mockService.getBusiness().subscribe(business => {
      this.business = business;
      this.isLoading = false;
      this.getFeaturedBusiness();
    });
  }

  getFeaturedBusiness() {
    this.featuredBusiness = this.business.sort((a, b) => b.score - a.score).slice(0, 4);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
