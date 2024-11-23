import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginToReviewModalComponent } from './login-to-review-modal.component';

describe('LoginToReviewModalComponent', () => {
  let component: LoginToReviewModalComponent;
  let fixture: ComponentFixture<LoginToReviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginToReviewModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginToReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
