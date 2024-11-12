import { Component } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { ModalService } from '../../../../Services/modal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-complete-profile-modal',
  standalone: true,
  imports: [
    ModalComponent
  ],
  templateUrl: './cancel-complete-profile-modal.component.html',
  styleUrl: './cancel-complete-profile-modal.component.scss'
})
export class CancelCompleteProfileModalComponent {

  modalHeaderTitle = 'Estás a punto de cancelar esta acción';
  modalSubtitle = '¿Estás seguro?';
  modalMainButtonText = 'Seguir editando';
  modalSecondaryButtonText = 'Salir';

  constructor(
    private modalService: ModalService,
    private router: Router
  ) {}

  closeModal = () => {
    this.modalService.closeModal('cancelCompleteProfile');
  }
  goToHome = () => {

    this.closeModal();
    this.router.navigate(['/']);
  }
}
