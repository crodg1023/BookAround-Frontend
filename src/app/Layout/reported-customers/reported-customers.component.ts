import { Component, OnInit } from '@angular/core';
import { ReportedUserCardComponent } from '../../Components/Utils/reported-user-card/reported-user-card.component';
import { Client } from '../../Interfaces/client';
import { ReportsService } from '../../Services/Reports/reports.service';
import { AuthService } from '../../Services/Auth/auth.service';

@Component({
  selector: 'app-reported-customers',
  standalone: true,
  imports: [
    ReportedUserCardComponent
  ],
  templateUrl: './reported-customers.component.html',
  styleUrl: './reported-customers.component.scss'
})
export class ReportedCustomersComponent implements OnInit {

  reportedCustomers: any[] = [];
  groupedReportedCustomers: any[] = [];

  constructor(
    private reportsService: ReportsService,
    private authSeervice: AuthService,
  ) {}

  ngOnInit(): void {
    this.fetchReportedCustomers();
    this.authSeervice.userRole$.subscribe(x => console.log(x));
  }

  fetchReportedCustomers() {
    this.reportsService.getReportedCustomers().subscribe(x => {
      this.reportedCustomers = x;
      this.groupedReportedCustomers = this.groupReportsByUser();
    });
  }

  groupReportsByUser() {
    const reportsMap = new Map<number, { customer: any, count: number }>();

    this.reportedCustomers.forEach(customer => {
      const id = customer.reportable.id;

      if (reportsMap.has(id)) {
        reportsMap.get(id)!.count++;
      } else {
        reportsMap.set(id, { customer, count: 1 });
      }
    });

    return [...reportsMap.values()];
  }

  handleDeletedUser(id: number) {
    this.groupedReportedCustomers = this.groupedReportedCustomers.filter((x: any) => x.customer.reportable.id !== id);
  }

}
