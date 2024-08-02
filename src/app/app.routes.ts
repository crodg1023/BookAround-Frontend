import { Routes } from '@angular/router';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
import { HomeComponent } from './Views/home/home.component';
import { businessInformationResolver, businessResolver } from './Resolvers/Business/business.resolver';
import { BusinessInformationComponent } from './Views/business-information/business-information.component';
import { BusinessGridComponent } from './Layout/business-grid/business-grid.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Book Arounde | Home' },
  { path: 'business', component: DashboardComponent, title: 'Comercios locales', resolve: { business: businessResolver }, children: [
    { path: '', component: BusinessGridComponent },
    { path: 'find/:id', component: BusinessInformationComponent, resolve: { businessInformation: businessInformationResolver } }
  ] },
];
