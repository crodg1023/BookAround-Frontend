import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../../Services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  @Input() title: string = '';
  @Input() buttonText: string = '';
  @Input() buttonAction!: () => void;
  @Input() stepBackAction!: () => void;
  @Input() hasStepBack: boolean = false;
  @Input() step: number = 0;
  @Input() modalType: string = '';
  @Input() username: string = '';
  isOpen: boolean = false;
  isVisible: boolean = false;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.modalState$.subscribe(state => {
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
}
