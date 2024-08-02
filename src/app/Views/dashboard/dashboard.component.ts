import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../Layout/navbar/navbar.component';
import { CategoryFilterComponent } from '../../Components/Utils/category-filter/category-filter.component';
import { BusinessCardComponent } from '../../Components/Utils/business-card/business-card.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../Layout/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent, CategoryFilterComponent, BusinessCardComponent, FooterComponent, CommonModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent  {


}
