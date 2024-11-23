import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeAdminPanelComponent } from './welcome-admin-panel.component';

describe('WelcomeAdminPanelComponent', () => {
  let component: WelcomeAdminPanelComponent;
  let fixture: ComponentFixture<WelcomeAdminPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeAdminPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeAdminPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
