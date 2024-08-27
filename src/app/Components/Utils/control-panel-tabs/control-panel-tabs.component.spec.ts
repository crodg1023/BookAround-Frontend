import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlPanelTabsComponent } from './control-panel-tabs.component';

describe('ControlPanelTabsComponent', () => {
  let component: ControlPanelTabsComponent;
  let fixture: ComponentFixture<ControlPanelTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlPanelTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlPanelTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
