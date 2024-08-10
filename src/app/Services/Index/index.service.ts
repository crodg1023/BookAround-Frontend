import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexService {
  private currentIndexSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  currentIndex$ = this.currentIndexSubject.asObservable();

  constructor() { }

  setCurrentIndex(index: number) {
    this.currentIndexSubject.next(0);
  }

  getCurrentIndex() {
    return this.currentIndexSubject.getValue();
  }
}
