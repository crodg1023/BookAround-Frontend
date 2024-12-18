import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProfilePictureComponent } from './update-profile-picture.component';

describe('UpdateProfilePictureComponent', () => {
  let component: UpdateProfilePictureComponent;
  let fixture: ComponentFixture<UpdateProfilePictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateProfilePictureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateProfilePictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
