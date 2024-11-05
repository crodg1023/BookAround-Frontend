import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PlacesInputAutocompleteComponent } from '../places-input-autocomplete/places-input-autocomplete.component';

@Component({
  selector: 'app-editable-information-item',
  standalone: true,
  imports: [CommonModule, PlacesInputAutocompleteComponent],
  templateUrl: './editable-information-item.component.html',
  styleUrl: './editable-information-item.component.scss'
})
export class EditableInformationItemComponent {

  @Input() itemInformation: string = '';
  @Input() label: string = '';
  @Input() type: string = '';
  @Output() itemChange = new EventEmitter<string>();
  isEditing: boolean = false;
  isAddress: boolean = false;

  getIcon() : string {
    switch(this.type) {
      case 'name':
        return 'fa-regular fa-user';
      case 'address':
        return 'fa-solid fa-location-dot';
      case 'phone':
        return 'fa-solid fa-phone';
      case 'email':
        return 'fa-regular fa-envelope';
      default:
        return '';
    }
  }

  getPlaceholder() : string {
    switch(this.type) {
      case 'name':
        return 'Tu nombre';
      case 'address':
        return 'Tu dirección';
      case 'phone':
        return 'Tu número de teléfono';
      case 'email':
        return 'Tu dirección de correo electrónico';
      default:
        return '';
    }
  }

  enableEditing() {
    this.isAddress = this.type === 'address';
    this.isEditing = true;
  }
  disableEditing() {
    this.isAddress = false;
    this.isEditing = false;
  }

  informationChange(e: Event) {
    const newInformation = e.target as HTMLInputElement;
    console.log(newInformation.value);
    this.itemChange.emit(newInformation.value);
  }
}
