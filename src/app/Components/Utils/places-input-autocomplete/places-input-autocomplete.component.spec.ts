import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacesInputAutocompleteComponent } from './places-input-autocomplete.component';

describe('PlacesInputAutocompleteComponent', () => {
  let component: PlacesInputAutocompleteComponent;
  let fixture: ComponentFixture<PlacesInputAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlacesInputAutocompleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlacesInputAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
