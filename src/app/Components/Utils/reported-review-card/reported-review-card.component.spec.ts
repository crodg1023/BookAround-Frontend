import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedReviewCardComponent } from './reported-review-card.component';

describe('ReportedReviewCardComponent', () => {
  let component: ReportedReviewCardComponent;
  let fixture: ComponentFixture<ReportedReviewCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportedReviewCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportedReviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
