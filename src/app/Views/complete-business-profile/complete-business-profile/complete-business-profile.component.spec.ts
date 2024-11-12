import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteBusinessProfileComponent } from './complete-business-profile.component';

describe('CompleteBusinessProfileComponent', () => {
  let component: CompleteBusinessProfileComponent;
  let fixture: ComponentFixture<CompleteBusinessProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteBusinessProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteBusinessProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
