import { Component } from '@angular/core';
import { BusinessCardComponent } from '../../Components/Utils/business-card/business-card.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-business-grid',
  standalone: true,
  imports: [BusinessCardComponent],
  templateUrl: './business-grid.component.html',
  styleUrl: './business-grid.component.scss'
})
export class BusinessGridComponent {
  business: any[] = [];
  displayed: any[] = [];
  category: string = '';
  count: number = 12;
  currentIndex = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ business }) => {
      this.business = business;
    });
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      this.filterByCategory();
    });
    this.showMore();
  }

  showMore() {
    const nextIndex = this.currentIndex + this.count;
    if (this.category) {
      this.displayed = this.displayed = this.business.filter(x => x.category === this.category);
    } else {
      this.displayed = this.displayed.concat(this.business.slice(this.currentIndex, nextIndex));
    }
    this.currentIndex = nextIndex;
  }

  showLess() {
    this.currentIndex >= this.count ? this.currentIndex -= this.count : this.currentIndex = 0;
    this.displayed = this.displayed.slice(0, this.currentIndex);
  }

  filterByCategory() {
    if (this.category) {
      this.displayed = this.business.filter(x => x.category === this.category);
    }
  }

  showAll() {
    this.displayed = this.business.slice(0, 12);
    this.router.navigate(['/business']);
  }
}
