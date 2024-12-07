import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateTime } from 'luxon';
import { ClientService } from '../../../Services/Client/client.service';
import { ImageService } from '../../../Services/Images/image.service';

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
  src: string = 'assets/images/profile-placeholder.jpg'

  constructor(
    private clientService: ClientService,
    private imageService: ImageService
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

  getUserPicture() {
    this.imageService.getCustomerImage(this.reportedUser.reportable.id).subscribe(x => {
      const url = URL.createObjectURL(x);
      this.src = url;
    });
  }

}
