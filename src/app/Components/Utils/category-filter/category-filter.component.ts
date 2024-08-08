import { Component, OnInit } from '@angular/core';
import { MockService } from '../../../Services/Mocks/mock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss'
})
export class CategoryFilterComponent implements OnInit {

  categories: any[] = [];

  constructor(private mocksService: MockService, private router: Router) {}

  ngOnInit(): void {
    this.mocksService.getCategories().subscribe(categories => this.categories = categories);
  }

  onCategoryClick(category: string) {
    this.router.navigate(['/business'], { queryParams: { category: category }});
  }
}
