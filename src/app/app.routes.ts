import { Routes } from '@angular/router';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
import { HomeComponent } from './Views/home/home.component';
import { businessInformationResolver, businessResolver } from './Resolvers/Business/business.resolver';
import { BusinessInformationComponent } from './Views/business-information/business-information.component';
import { BusinessGridComponent } from './Layout/business-grid/business-grid.component';
import { NotFoundComponent } from './Views/not-found/not-found.component';
import { ControlPanelComponent } from './Views/control-panel/control-panel.component';
import { ProfileComponent } from './Layout/profile/profile.component';
import { AnalyticsComponent } from './Layout/analytics/analytics.component';
import { AppointmentsComponent } from './Layout/appointments/appointments.component';
import { AccountSummaryComponent } from './Layout/account-summary/account-summary.component';
import { authGuard } from './Guards/Auth/auth.guard';
import { CompleteBusinessProfileComponent } from './Views/complete-business-profile/complete-business-profile/complete-business-profile.component';
import { completeProfileGuard } from './Guards/CompleteProfile/complete-profile.guard';
import { AdminPanelComponent } from './Views/admin-panel/admin-panel.component';
import { WelcomeAdminPanelComponent } from './Layout/welcome-admin-panel/welcome-admin-panel.component';
import { ReportedCustomersComponent } from './Layout/reported-customers/reported-customers.component';
import { ReportedBusinessComponent } from './Layout/reported-business/reported-business.component';
import { ReportedReviewsComponent } from './Layout/reported-reviews/reported-reviews.component';
import { adminGuard } from './Guards/Roles/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Book Around | Home' },
  { path: 'business', component: DashboardComponent, title: 'Comercios locales', resolve: { business: businessResolver }, children: [
    { path: '', component: BusinessGridComponent },
    { path: 'find/:id', component: BusinessInformationComponent, resolve: { businessInformation: businessInformationResolver } }
  ] },
  { path: 'control-panel', component: ControlPanelComponent, title: 'Panel de control', canActivate: [authGuard], canActivateChild: [authGuard], children: [
    { path: '', component: AccountSummaryComponent, title: 'Resumen de tu cuenta' },
    { path: 'profile', component: ProfileComponent, title: 'Tu perfil' },
    { path: 'analytics', component: AnalyticsComponent, title: 'Analíticas de tu comercio' },
    { path: 'appointments', component: AppointmentsComponent, title: 'Tus citas' },
  ] },
  { path: 'admin', component: AdminPanelComponent, title: 'Admin | Panel de control', canActivate: [authGuard, adminGuard], children: [
    { path: '', component: WelcomeAdminPanelComponent },
    { path: 'customers', component: ReportedCustomersComponent, title: 'Usuarios reportados' },
    { path: 'business', component: ReportedBusinessComponent, title: 'Comercios reportados' },
    { path: 'reviews', component: ReportedReviewsComponent, title: 'Reseñas reportados' },
  ] },
  { path: 'complete-profile', component: CompleteBusinessProfileComponent, title: 'Completa tu perfil', canActivate: [completeProfileGuard] },
  { path: '**', component: NotFoundComponent, title: 'Ups! | Página no encontrada' }
];
