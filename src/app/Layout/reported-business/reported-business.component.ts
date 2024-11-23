import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../Services/Reports/reports.service';
import { ReportedBusinessCardComponent } from '../../Components/Utils/reported-business-card/reported-business-card.component';
import { count } from 'rxjs';

@Component({
  selector: 'app-reported-business',
  standalone: true,
  imports: [
    ReportedBusinessCardComponent
  ],
  templateUrl: './reported-business.component.html',
  styleUrl: './reported-business.component.scss'
})
export class ReportedBusinessComponent implements OnInit {

  reportedBusiness: any[] = [];
  groupedReportedBusiness = [];

  constructor(
    private reportsService: ReportsService
  ) {}

  ngOnInit(): void {
    this.fetchReportedBusiness();
  }

  fetchReportedBusiness() {
    this.reportsService.getReportedBusiness().subscribe(x => this.reportedBusiness = x);
  }

  groupReportsByBusiness() {
    const reportedBusinessMap = new Map<number, { business: any, count: number }>();

    this.reportedBusiness.forEach(business => {
      const id = business.reportable.id;

      if (reportedBusinessMap.has(id)) {
        reportedBusinessMap.get(id)!.count++;
      } else {
        reportedBusinessMap.set(id, { business, count: 1 });
      }
    });

    return [...reportedBusinessMap.values()];
  }
}
