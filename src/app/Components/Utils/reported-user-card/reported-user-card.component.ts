import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateTime } from 'luxon';
import { ClientService } from '../../../Services/Client/client.service';

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
  @Output() deletedUser = new EventEmitter<number>();

  constructor(
    private clientService: ClientService
  ) {}

  get parsedDate() {
    return DateTime.fromISO(this.reportedUser.created_at).toFormat('dd/MM/yyyy');
  }

  deleteUser() {
    this.clientService.deleteClient(this.reportedUser.reportable.id).subscribe(x => {
      console.log(x);
    });
    this.deletedUser.emit(this.reportedUser.reportable.id);
  }

}
