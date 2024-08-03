import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../Services/modal.service';
import { ModalTypes } from '../../Interfaces/modal-types';
import { BusinessRegisterComponent } from '../../Components/Modals/business-register/business-register.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

  constructor(private router: Router, private modalService: ModalService) {}

  onGoToBusinessClick() {
    this.router.navigate(['/business']);
  }

  onRegisterMyBusinessClick() {
    this.modalService.openModal(ModalTypes.BusinessRegister);
  }
}
