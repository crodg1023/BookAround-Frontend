import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableInformationItemComponent } from './editable-information-item.component';

describe('EditableInformationItemComponent', () => {
  let component: EditableInformationItemComponent;
  let fixture: ComponentFixture<EditableInformationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditableInformationItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditableInformationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
