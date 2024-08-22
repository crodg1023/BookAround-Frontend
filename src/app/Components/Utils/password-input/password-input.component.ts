import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: PasswordInputComponent,
      multi: true
    }
  ]
})
export class PasswordInputComponent implements ControlValueAccessor {
  @Input() labelText!: string;
  @Input() showIcon!: boolean;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();
  showPassword: boolean = false;
  input!: string;
  onChange: any = () => {};
  onTouched: () => void = () => {};

  writeValue(input: any): void {
    this.input = input;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event) {
    this.valueChange.emit((event.target as HTMLInputElement).value);
  }

  toggleShowPassword(e: Event) {
    e.preventDefault();
    this.showPassword = !this.showPassword;
  }
}
