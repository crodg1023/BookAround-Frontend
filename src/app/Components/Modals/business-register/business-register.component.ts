import { Component, NgModule } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { CategoryCheckboxComponent } from '../../Utils/category-checkbox/category-checkbox.component';
import { ModalService } from '../../../Services/modal.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-business-register',
  standalone: true,
  imports: [ModalComponent, CommonModule, CategoryCheckboxComponent],
  templateUrl: './business-register.component.html',
  styleUrl: './business-register.component.scss'
})
export class BusinessRegisterComponent {
  modalTitle: string = 'Registra tu negocio';
  modalButtonText: string = 'Siguiente';
  showPassword: boolean = false;
  currentStep: number = 1;
  lastStep: number = 3;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modalService.currentModalStep$.subscribe(step => {
      this.currentStep = step;
      this.updateModalInformation();
    });
  }

  toggleShowPassword(e: Event) {
    e.preventDefault();
    this.showPassword = !this.showPassword;
  }

  nextStep() {
    if (this.currentStep === this.lastStep) {
      alert('Has registrado tu negocio');
      this.modalService.closeModal('businessRegister');
    }
    if (this.currentStep < this.lastStep) {
      this.currentStep++
      this.modalService.nextStep(this.currentStep);
    }
  }

  updateModalInformation() {
    this.currentStep === this.lastStep ? this.modalButtonText = 'Finalizar' : this.modalButtonText = 'Siguiente';
  }
}
