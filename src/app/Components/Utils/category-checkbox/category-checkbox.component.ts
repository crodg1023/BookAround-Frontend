import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-checkbox.component.html',
  styleUrl: './category-checkbox.component.scss'
})
export class CategoryCheckboxComponent {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() icon: string = '';
  isChecked: boolean = false;

  onChecked(e: Event) {
    const checkbox = e.target as HTMLInputElement;
    console.log(checkbox.checked, this.id);
    this.isChecked = checkbox.checked;
  }
}
