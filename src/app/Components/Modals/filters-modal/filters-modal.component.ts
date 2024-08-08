import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxSliderModule, Options } from '@angular-slider/ngx-slider';
import { ModalService } from '../../../Services/modal.service';

@Component({
  selector: 'app-filters-modal',
  standalone: true,
  imports: [ModalComponent, CommonModule, ReactiveFormsModule, NgxSliderModule],
  templateUrl: './filters-modal.component.html',
  styleUrl: './filters-modal.component.scss'
})
export class FiltersModalComponent implements OnInit {

  filtersForm!: FormGroup;
  rating: number = 0;
  hoverRating: number = 0;
  maxRating: number = 5;
  stars = Array(this.maxRating)
  from: number = 50;
  to: number = 150;
  options: Options = {
    floor: 0,
    ceil: 200,
  }

  constructor(private formBuilder: FormBuilder, private modalService: ModalService) {}

  ngOnInit(): void {
    this.filtersForm = this.formBuilder.group({
    });
  }

  setRate(rating: number) {
    this.rating = rating;
  }
  setHoverRating(rating: number) {
    this.hoverRating = rating;
  }
  resetHover() {
    this.hoverRating = 0;
  }

  filter() {
    alert('Filtrando!');
    this.modalService.closeModal('filters');
  }
}
