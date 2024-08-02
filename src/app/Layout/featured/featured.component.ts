import { Component, OnInit } from '@angular/core';
import { BusinessCardComponent } from '../../Components/Utils/business-card/business-card.component';
import { MockService } from '../../Services/Mocks/mock.service';
import { CategoryFilterComponent } from '../../Components/Utils/category-filter/category-filter.component';
import { Business } from '../../Interfaces/business';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [BusinessCardComponent, CategoryFilterComponent],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.scss'
})
export class FeaturedComponent implements OnInit {
  business: Business[] = [];
  featuredBusiness: Business[] = [];

  constructor(private mockService: MockService) {}

  ngOnInit(): void {
    this.mockService.getBusiness().subscribe(business => {
      this.business = business;
      this.getFeaturedBusiness();
    });
  }

  getFeaturedBusiness() {
    this.featuredBusiness = this.business.sort((a, b) => b.score - a.score).slice(0, 4);
  }
}
