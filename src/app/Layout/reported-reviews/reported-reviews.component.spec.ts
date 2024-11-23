import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedReviewsComponent } from './reported-reviews.component';

describe('ReportedReviewsComponent', () => {
  let component: ReportedReviewsComponent;
  let fixture: ComponentFixture<ReportedReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportedReviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportedReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
