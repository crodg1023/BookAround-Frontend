import { Component } from '@angular/core';
import { BusinessCardComponent } from '../../Components/Utils/business-card/business-card.component';
import { ActivatedRoute } from '@angular/router';

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
  count: number = 12;
  currentIndex = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ business }) => {
      this.business = business;
    });
    this.showMore();
  }

  showMore() {
    const nextIndex = this.currentIndex + this.count;
    this.displayed = this.displayed.concat(this.business.slice(this.currentIndex, nextIndex));
    this.currentIndex = nextIndex;
  }

  showLess() {
    this.currentIndex >= this.count ? this.currentIndex -= this.count : this.currentIndex = 0;
    this.displayed = this.business.slice(0, this.currentIndex);
  }
}
