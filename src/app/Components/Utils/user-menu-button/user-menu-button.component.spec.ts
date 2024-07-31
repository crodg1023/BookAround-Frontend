import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMenuButtonComponent } from './user-menu-button.component';

describe('UserMenuButtonComponent', () => {
  let component: UserMenuButtonComponent;
  let fixture: ComponentFixture<UserMenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserMenuButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
