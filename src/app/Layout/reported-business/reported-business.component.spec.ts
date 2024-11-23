import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportedBusinessComponent } from './reported-business.component';

describe('ReportedBusinessComponent', () => {
  let component: ReportedBusinessComponent;
  let fixture: ComponentFixture<ReportedBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportedBusinessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportedBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
