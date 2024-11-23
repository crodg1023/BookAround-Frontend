import { Component, Input } from '@angular/core';
import { DateTime } from 'luxon';

@Component({
  selector: 'app-reported-user-card',
  standalone: true,
  imports: [],
  templateUrl: './reported-user-card.component.html',
  styleUrl: './reported-user-card.component.scss'
})
export class ReportedUserCardComponent {

  @Input() reportedUser: any;
  @Input() count: number = 0;

  get parsedDate() {
    return DateTime.fromISO(this.reportedUser.created_at).toFormat('dd/MM/yyyy');
  }

}
