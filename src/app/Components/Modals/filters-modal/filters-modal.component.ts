import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { ModalService } from '../../../Services/modal.service';
import { RatingStarsComponent } from '../../Utils/rating-stars/rating-stars.component';
import { FiltersService } from '../../../Services/Filters/filters.service';
import { Filters } from '../../../Interfaces/filters';
import { Router } from '@angular/router';
import { PlacesInputAutocompleteComponent } from '../../Utils/places-input-autocomplete/places-input-autocomplete.component';

@Component({
  selector: 'app-filters-modal',
  standalone: true,
  imports: [
    ModalComponent,
    CommonModule,
    ReactiveFormsModule,
    NgxSliderModule,
    RatingStarsComponent,
    PlacesInputAutocompleteComponent
  ],
  templateUrl: './filters-modal.component.html',
  styleUrl: './filters-modal.component.scss'
})
export class FiltersModalComponent implements OnInit {

  filtersForm!: FormGroup;
  rating: number = 0;
  from: number = 50;
  to: number = 150;
  options: Options = {
    floor: 0,
    ceil: 200,
  }
  filters!: Filters;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalService,
    private FiltersService: FiltersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.filtersForm = this.formBuilder.group({
      location: ''
    });
  }

  get location() {
    return this.filtersForm.get('location');
  }

  handleRating(rating: number) {
    this.rating = rating;
  }

  filter = () => {
    this.filters = {
      location: this.location?.value,
      rating: this.rating,
      minPrice: this.from,
      maxPrice: this.to
    }
    console.log(this.filters);
    this.FiltersService.updateFilters(this.filters);
    this.router.navigate(['/business'], { queryParams: [] })
    this.modalService.closeModal('filters');
  }
}
