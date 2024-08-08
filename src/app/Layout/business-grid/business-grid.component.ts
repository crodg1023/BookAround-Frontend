import { Component } from '@angular/core';
import { BusinessCardComponent } from '../../Components/Utils/business-card/business-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FiltersModalComponent } from '../../Components/Modals/filters-modal/filters-modal.component';
import { ModalService } from '../../Services/modal.service';

@Component({
  selector: 'app-business-grid',
  standalone: true,
  imports: [BusinessCardComponent, FiltersModalComponent],
  templateUrl: './business-grid.component.html',
  styleUrl: './business-grid.component.scss'
})
export class BusinessGridComponent {
  business: any[] = [];
  displayed: any[] = [];
  category: string = '';
  count: number = 12;
  currentIndex = 0;
  showing: number = 0;

  constructor(private route: ActivatedRoute, private router: Router, private modalService: ModalService) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ business }) => {
      this.business = business;
    });
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      this.filterByCategory();
    });
    this.category ?? this.showMore();
  }

  showMore() {
    const nextIndex = this.currentIndex + this.count;
    nextIndex >= this.business.length ? this.showing = this.business.length : this.showing = nextIndex;
    if (this.category) {
      this.displayed = this.displayed = this.business.filter(x => x.category === this.category);
    } else {
      this.displayed = this.displayed.concat(this.business.slice(this.currentIndex, nextIndex));
    }
    this.currentIndex = nextIndex;
  }

  showLess() {
    this.currentIndex >= this.count ? this.currentIndex -= this.count : this.currentIndex = 0;
    this.showing = this.currentIndex;
    this.displayed = this.displayed.slice(0, this.currentIndex);
  }

  filterByCategory() {
    if (this.category) {
      this.displayed = this.business.filter(x => x.category === this.category);
      this.showing = this.displayed.length;
    }
  }

  showAll() {
    this.displayed = this.business.slice(0, 12);
    this.showing = this.displayed.length;
    this.router.navigate(['/business']);
  }

  openFiltersModal() {
    this.modalService.openModal('filters');
  }
}
