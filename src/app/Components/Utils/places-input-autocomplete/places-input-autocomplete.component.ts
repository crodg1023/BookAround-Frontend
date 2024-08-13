import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-places-input-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './places-input-autocomplete.component.html',
  styleUrl: './places-input-autocomplete.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PlacesInputAutocompleteComponent,
      multi: true
    }
  ]
})
export class PlacesInputAutocompleteComponent implements AfterViewInit, ControlValueAccessor {
  @ViewChild('inputField') inputField!: ElementRef;
  autocomplete!: google.maps.places.Autocomplete;
  input!: string;
  onChange: any = () => {};
  onTouched: () => void = () => {};

  ngAfterViewInit(): void {
    this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement);
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();
      if (place && place.formatted_address) {
        this.input = place.formatted_address;
        this.onChange(this.input);
        this.inputField.nativeElement.value = this.input;
      }
    });
  }

  writeValue(input: any): void {
    this.input = input;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
