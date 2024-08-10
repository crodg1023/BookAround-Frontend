import { Component } from '@angular/core';
import { BusinessCardComponent } from '../../Components/Utils/business-card/business-card.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FiltersModalComponent } from '../../Components/Modals/filters-modal/filters-modal.component';
import { ModalService } from '../../Services/modal.service';
import { FiltersService } from '../../Services/Filters/filters.service';
import { Filters } from '../../Interfaces/filters';
import { IndexService } from '../../Services/Index/index.service';

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
  currentIndex!: number;
  showing: number = 0;
  hasFiltered: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private modalService: ModalService, private filtersService: FiltersService, private indexService: IndexService) {}

  ngOnInit(): void {
    this.currentIndex = this.indexService.getCurrentIndex();

    this.route.data.subscribe(({ business }) => {
      this.business = business;
    });
    this.route.queryParams.subscribe(params => {
      this.category = params['category'];
      this.filterByCategory();
    });
    this.filtersService.filters$.subscribe(filters => {
      if (filters) {
        this.filter(filters);
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.filtersService.resetFilters();
      }
    });

    if (!this.category && !this.hasFiltered) this.showMore();
  }

  showMore() {
    const nextIndex = this.currentIndex + this.count;
    nextIndex >= this.business.length ? this.showing = this.business.length : this.showing = nextIndex;
    if (this.category) {
      this.displayed = this.business.filter(x => x.category === this.category);
    } else {
      this.displayed = this.displayed.concat(this.business.slice(this.currentIndex, nextIndex));
    }
    this.currentIndex = nextIndex;
    this.indexService.setCurrentIndex(this.currentIndex);
  }

  showLess() {
    this.currentIndex >= this.count ? this.currentIndex -= this.count : this.currentIndex = 0;
    this.showing = this.currentIndex;
    this.displayed = this.displayed.slice(0, this.currentIndex);
    this.indexService.setCurrentIndex(this.currentIndex);
  }

  filterByCategory() {
    if (this.category) {
      this.displayed = this.business.filter(x => x.category === this.category);
      this.showing = this.displayed.length;
    }
  }

  showAll() {
    this.displayed = this.business.slice(0, this.count);
    this.showing = this.displayed.length;
    this.currentIndex = this.count;
    this.hasFiltered = false;
    this.indexService.setCurrentIndex(this.currentIndex);
    this.router.navigate(['/business']);
  }

  filter(filters: Filters) {
      this.displayed = this.business.filter(business => {
        const matchesName = !filters.name || this.removeAccent(business.name).toLocaleLowerCase().includes(this.removeAccent(filters.name).toLocaleLowerCase());

        const matchesCoutnry = !filters.country || filters.country === business.country;
        const matchesCity = !filters.city || filters.city === business.city;
        const matchesRating = !filters.rating || (business.score >= filters.rating && business.score < filters.rating + 1);
        const matchesPrice = (!filters.minPrice || business.price >= filters.minPrice) && (!filters.maxPrice || business.price <= filters.maxPrice);

        return matchesName && matchesCoutnry && matchesCity && matchesRating && matchesPrice;
      }).sort((a, b) => b.score - a.score);
    this.showing = this.displayed.length;
    this.hasFiltered = true;
  }

  removeAccent(string: string) {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  openFiltersModal() {
    this.modalService.openModal('filters');
  }
}
