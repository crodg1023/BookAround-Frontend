import { Component, OnDestroy, OnInit } from '@angular/core';
import { BusinessCardComponent } from '../../Components/Utils/business-card/business-card.component';
import { MockService } from '../../Services/Mocks/mock.service';
import { CategoryFilterComponent } from '../../Components/Utils/category-filter/category-filter.component';
import { Business } from '../../Interfaces/business';
import { Subscription } from 'rxjs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BusinessService } from '../../Services/Business/business.service';

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

  constructor(private mockService: MockService, private businessService: BusinessService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscription = this.businessService.getAllBusiness().subscribe(business => {
      this.business = business;
      this.isLoading = false;
      this.getFeaturedBusiness();
    });
  }

  getFeaturedBusiness() {
    this.featuredBusiness = this.business.sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(0, 4);
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
