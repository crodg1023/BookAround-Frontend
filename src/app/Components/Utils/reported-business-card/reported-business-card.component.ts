import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateTime } from 'luxon';
import { StarsService } from '../../../Services/Stars/stars.service';
import { CommonModule } from '@angular/common';
import { BusinessService } from '../../../Services/Business/business.service';

@Component({
  selector: 'app-reported-business-card',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './reported-business-card.component.html',
  styleUrl: './reported-business-card.component.scss'
})
export class ReportedBusinessCardComponent {

  @Input() reportedBusiness: any;
  @Input() count: number = 0;
  @Output() reportedBusinessDeleted = new EventEmitter<number>();

  constructor(
    private starsService: StarsService,
    private businessService: BusinessService
  ) {}

  get parsedDate() {
    return DateTime.fromISO(this.reportedBusiness.created_at).toFormat('dd/MM/yyyy');
  }
  get scoreStars() {
    return this.starsService.getScoreStars(this.reportedBusiness.reportable.score);
  }

  deleteBusiness() {
    this.businessService.deleteBusiness(this.reportedBusiness.reportable.id).subscribe(x => console.log(x));
    this.reportedBusinessDeleted.emit(this.reportedBusiness.reportable.id);
  }
}
