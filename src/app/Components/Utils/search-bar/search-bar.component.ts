import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FiltersService } from '../../../Services/Filters/filters.service';
import { Filters } from '../../../Interfaces/filters';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  @ViewChild('nameInput') nameInput!: ElementRef;
  nameFilter!: Filters;

  constructor(private filtersService: FiltersService, private router: Router) {}

  async search() {
    const element = this.nameInput.nativeElement as HTMLInputElement;
    const value = element.value;

    if (value) {
      this.nameFilter = {
        name: value
      }

      if (this.router.url !== '/business') {
        await this.router.navigate(['/business']);
      }

      this.filtersService.updateFilters(this.nameFilter);
      this.nameInput.nativeElement.value = '';
    }
  }

}
