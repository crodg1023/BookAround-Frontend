import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessGridComponent } from './business-grid.component';

describe('BusinessGridComponent', () => {
  let component: BusinessGridComponent;
  let fixture: ComponentFixture<BusinessGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusinessGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
