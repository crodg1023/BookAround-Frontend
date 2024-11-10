import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from '../../../Services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  @Input() buttonText: string = '';
  @Input() buttonAction!: () => void;
  @Input() stepBackAction!: () => void;
  @Input() hasStepBack: boolean = false;
  @Input() step: number = 0;
  @Input() modalType: string = '';
  @Input() username: string = '';
  @Input() hasHeader: boolean = false;
  @Input() hasActionButtons: boolean = true;
  @Input() headerTitle: string = 'Te damos la bienvenida a Book Around';
  @Input() icon!: string;
  @Input() buttonActionIsDisabled: boolean = true;
  isOpen: boolean = false;
  isVisible: boolean = false;
  subscription!: Subscription;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.subscription = this.modalService.modalState$.subscribe(state => {
      if (state[this.modalType]) {
        this.isVisible = true;
        setTimeout(() =>this.isOpen = true, 10);
      } else {
        this.isOpen = false;
        setTimeout(() => this.isVisible = false, 300);
      }
    });
  }

  onClose() {
    this.modalService.closeModal(this.modalType);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
