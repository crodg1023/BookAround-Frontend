import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Filters } from '../../Interfaces/filters';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private filters: BehaviorSubject<Filters | null> = new BehaviorSubject<Filters | null>(null);
  filters$ = this.filters.asObservable();

  constructor() { }

  updateFilters(newFilters: Filters) {
    this.filters.next(newFilters);
  }
  resetFilters() {
    this.filters.next(null);
  }
}
