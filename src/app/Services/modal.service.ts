import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalStateSubject = new BehaviorSubject<{ [key: string]: boolean }>({});
  modalState$ = this.modalStateSubject.asObservable();

  private currentModalTypeSubject = new BehaviorSubject<string>('');
  currentModalType$ = this.currentModalTypeSubject.asObservable();

  private currentModalStepSubject = new BehaviorSubject<number>(1);
  currentModalStep$ = this.currentModalStepSubject.asObservable();

  openModal(modalType: string) {
    this.modalStateSubject.next({ [modalType]: true });
    this.currentModalTypeSubject.next(modalType);
    this.currentModalStepSubject.next(1);
  }

  closeModal(modalType: string) {
    this.modalStateSubject.next({ [modalType]: false });
    setTimeout(() => this.currentModalStepSubject.next(1), 300);
    if (modalType === this.currentModalTypeSubject.value) {
      this.currentModalTypeSubject.next('');
    }
  }

  nextStep(step: number) {
    this.currentModalStepSubject.next(step);
  }

  closeAllModals() {
    this.modalStateSubject.next({});
    this.currentModalTypeSubject.next('');
  }

  constructor() { }
}
