import { Injectable } from '@angular/core';
import { Categories } from '../../Interfaces/categoies';

@Injectable({
  providedIn: 'root'
})
export class CategoryIconsService {

  constructor() { }

  getCategoryIcon(category: string) {
    switch (category) {
      case Categories.Cocina:
        return 'fa-solid fa-utensils';
      case Categories.Barberia:
        return 'fa-solid fa-scissors';
      case Categories.Belleza:
        return 'fa-solid fa-paintbrush';
      case Categories.Bar:
        return 'fa-solid fa-wine-glass';
      case Categories.Panaderia:
        return 'fa-solid fa-bread-slice';
      case Categories.Spa:
        return 'fa-solid fa-spa';
      case Categories.Cafes:
        return 'fa-solid fa-mug-hot';
      case Categories.Ropa:
        return 'fa-solid fa-shirt';
      default:
        return '';
    }
  }
}
