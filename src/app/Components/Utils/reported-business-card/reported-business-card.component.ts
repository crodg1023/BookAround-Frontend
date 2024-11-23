import { Component, Input } from '@angular/core';
import { DateTime } from 'luxon';
import { StarsService } from '../../../Services/Stars/stars.service';
import { CommonModule } from '@angular/common';

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

  constructor(
    private starsService: StarsService
  ) {}

  get parsedDate() {
    return DateTime.fromISO(this.reportedBusiness.created_at).toFormat('dd/MM/yyyy');
  }
  get scoreStars() {
    return this.starsService.getScoreStars(this.reportedBusiness.reportable.score);
  }
}
