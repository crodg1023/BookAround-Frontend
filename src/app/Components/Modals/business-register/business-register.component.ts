import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../Services/modal.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlacesInputAutocompleteComponent } from '../../Utils/places-input-autocomplete/places-input-autocomplete.component';
import { Subscription } from 'rxjs';
import { PasswordInputComponent } from '../../Utils/password-input/password-input.component';
import { Category } from '../../../Interfaces/category';
import { CategoriesService } from '../../../Services/Categories/categories.service';
import { Router } from '@angular/router';
import { CompleteProfileService } from '../../../Services/Business/complete-profile.service';

@Component({
  selector: 'app-business-register',
  standalone: true,
  imports: [
    ModalComponent,
    CommonModule,
    PlacesInputAutocompleteComponent,
    ReactiveFormsModule,
    PasswordInputComponent
  ],
  templateUrl: './business-register.component.html',
  styleUrl: './business-register.component.scss',
  animations: []
})
export class BusinessRegisterComponent implements OnInit, OnDestroy {

  businessRegisterForm!: FormGroup;
  modalTitle: string = 'Registra tu negocio';
  modalButtonText: string = 'Siguiente';
  currentStep: number = 1;
  lastStep: number = 2;
  buttonIsDisbaled: boolean = true;
  oneCategoryChecked: boolean = false;
  categories: Category[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private completeProfileService: CompleteProfileService,
    private router: Router
  ) {}

  ngOnInit() : void {
    this.subscriptions.push(
      this.modalService.currentModalStep$.subscribe(step => {
        this.currentStep = step;
        this.updateModalInformation();
      }),
      this.categoriesService.getCategories().subscribe(categories => this.categories = categories)
    );

    this.businessRegisterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(5)]],
      address: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    });

    this.subscriptions.push(this.businessRegisterForm.valueChanges.subscribe(() => this.updateButton()));
  }

  get stepState() { return `step${this.currentStep}`; }
  get email() { return this.businessRegisterForm.get('email'); }
  get password() { return this.businessRegisterForm.get('password'); }
  get name() { return this.businessRegisterForm.get('name'); }
  get address() { return this.businessRegisterForm.get('address'); }
  get phone() { return this.businessRegisterForm.get('phone'); }
  get categos() { return this.businessRegisterForm.get('categories'); }

  nextStep() {
    if (this.currentStep === this.lastStep) {
      this.modalService.closeModal('businessRegister');
      this.submit();
    } else {
      this.currentStep++
      this.modalService.nextStep(this.currentStep);
      this.updateButton();
    }
  }

  stepBack() {
    this.currentStep--;
    this.modalService.nextStep(this.currentStep);
    this.updateButton();
  }

  updateModalInformation() {
    this.currentStep === this.lastStep ? this.modalButtonText = 'Completa tu perfil' : this.modalButtonText = 'Siguiente';
  }

  updateButton() {
    switch(this.currentStep) {
      case 1:
        this.buttonIsDisbaled = !(this.email?.valid && this.password?.valid);
        break;
      case 2:
        this.buttonIsDisbaled = !(this.name?.valid && this.address?.valid && this.phone?.valid);
        break;
      default:
        this.buttonIsDisbaled = false;
    }
  }

  submit() {
    const data = {
      email: this.email?.value,
      password: this.password?.value,
      name: this.name?.value,
      address: this.address?.value,
      phone: this.phone?.value
    }

    this.completeProfileService.activateRoute();
    this.router.navigate(['/complete-profile'], { state: { data } });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
