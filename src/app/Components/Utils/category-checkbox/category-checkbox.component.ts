import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-category-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-checkbox.component.html',
  styleUrl: './category-checkbox.component.scss',
})
export class CategoryCheckboxComponent {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() icon: string = '';
  @Input() disabled: boolean = false;
  @Output() checked: EventEmitter<boolean> = new EventEmitter<boolean>();
  isChecked: boolean = false;

  onChecked(e: Event) {
    const checkbox = e.target as HTMLInputElement;
    this.isChecked = checkbox.checked;
    this.checked.emit(this.isChecked);
  }
}
