import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedBusinessCardComponent } from './reported-business-card.component';

describe('ReportedBusinessCardComponent', () => {
  let component: ReportedBusinessCardComponent;
  let fixture: ComponentFixture<ReportedBusinessCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportedBusinessCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportedBusinessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
