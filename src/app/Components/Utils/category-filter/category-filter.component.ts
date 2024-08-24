import { Component, OnInit } from '@angular/core';
import { MockService } from '../../../Services/Mocks/mock.service';
import { Router } from '@angular/router';
import { CategoriesService } from '../../../Services/Categories/categories.service';
import { Category } from '../../../Interfaces/category';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [],
  templateUrl: './category-filter.component.html',
  styleUrl: './category-filter.component.scss'
})
export class CategoryFilterComponent implements OnInit {

  categories: Category[] = [];

  constructor(private router: Router, private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.categoriesService.getCategories().subscribe(categories => this.categories = categories);
  }

  onCategoryClick(category: string) {
    console.log(category);
    this.router.navigate(['/business'], { queryParams: { category: category }});
  }
}
