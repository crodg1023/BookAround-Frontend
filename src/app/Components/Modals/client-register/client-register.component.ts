import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../../../Services/modal.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-register',
  standalone: true,
  imports: [CommonModule, ModalComponent, ReactiveFormsModule],
  templateUrl: './client-register.component.html',
  styleUrl: './client-register.component.scss'
})
export class ClientRegisterComponent implements OnInit {
  modalTitle: string = 'Regístrate';
  modalButtonText: string = 'Finalizar';
  showPassword: boolean = false;
  regtisterForm!: FormGroup;
  clientName: string = '@User';

  constructor(private modalService: ModalService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.regtisterForm = this.formBuilder.group({
      name: ['']
    });
    this.regtisterForm.get('name')?.valueChanges.subscribe(value => {
      if (value) this.clientName = `@${value}`;
      else this.clientName = '@User';
    });
  }

  toggleShowPassword(e: Event) {
    e.preventDefault();
    this.showPassword = !this.showPassword;
  }

  modalButtonAction() {
    alert('Te has registrado!');
    this.modalService.closeModal('clientRegister');
  }
}
