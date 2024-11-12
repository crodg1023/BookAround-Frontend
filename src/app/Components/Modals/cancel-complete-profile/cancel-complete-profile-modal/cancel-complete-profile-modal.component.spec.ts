import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelCompleteProfileModalComponent } from './cancel-complete-profile-modal.component';

describe('CancelCompleteProfileModalComponent', () => {
  let component: CancelCompleteProfileModalComponent;
  let fixture: ComponentFixture<CancelCompleteProfileModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelCompleteProfileModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelCompleteProfileModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
