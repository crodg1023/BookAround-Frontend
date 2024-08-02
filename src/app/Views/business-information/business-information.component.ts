import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Business } from '../../Interfaces/business';
import { Title } from '@angular/platform-browser';
import { CategoryIconsService } from '../../Services/Icons/category-icons.service';

@Component({
  selector: 'app-business-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './business-information.component.html',
  styleUrl: './business-information.component.scss'
})
export class BusinessInformationComponent implements OnInit {
  business!: Business;

  constructor(private route: ActivatedRoute, private titleService: Title, private categoriesService: CategoryIconsService) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ businessInformation }) => this.business = businessInformation);
    this.titleService.setTitle(`${this.business.name} | Book Around`);
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
}
