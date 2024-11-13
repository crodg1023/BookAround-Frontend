import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompleteProfileService {

  constructor() { }

  private canAccessToCompleteProfile = new BehaviorSubject<boolean>(false);
  canAccessToCompleteProfile$ = this.canAccessToCompleteProfile.asObservable();

  activateRoute() {
    this.canAccessToCompleteProfile.next(true);
  }
  deactivateRoute() {
    this.canAccessToCompleteProfile.next(false);
  }
}
