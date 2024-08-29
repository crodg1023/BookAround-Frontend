import { Component, NgModule, OnDestroy, OnInit, signal } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { CommonModule } from '@angular/common';
import { CategoryCheckboxComponent } from '../../Utils/category-checkbox/category-checkbox.component';
import { ModalService } from '../../../Services/modal.service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { trigger, transition, style, animate, query } from '@angular/animations';
import { PlacesInputAutocompleteComponent } from '../../Utils/places-input-autocomplete/places-input-autocomplete.component';
import { forkJoin, Subscription, switchMap } from 'rxjs';
import { MockService } from '../../../Services/Mocks/mock.service';
import { PasswordInputComponent } from '../../Utils/password-input/password-input.component';
import { Category } from '../../../Interfaces/category';
import { CategoriesService } from '../../../Services/Categories/categories.service';
import { User } from '../../../Interfaces/user';
import { Business } from '../../../Interfaces/business';
import { BusinessService } from '../../../Services/Business/business.service';
import { UsersService } from '../../../Services/Users/users.service';

@Component({
  selector: 'app-business-register',
  standalone: true,
  imports: [
    ModalComponent,
    CommonModule,
    CategoryCheckboxComponent,
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
  lastStep: number = 3;
  buttonIsDisbaled: boolean = true;
  oneCategoryChecked: boolean = false;
  categories: Category[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private modalService: ModalService,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private businessService: BusinessService,
    private usersService: UsersService
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
      categories: this.formBuilder.array([])
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

  onChange(isChecked: boolean, name: string) {
    const categoriesFormArray = <FormArray>this.businessRegisterForm.controls['categories'];

    if (isChecked) {
      categoriesFormArray.push(new FormControl(name));
    } else {
      let index = categoriesFormArray.controls.findIndex(x => x.value === name);
      categoriesFormArray.removeAt(index);
    }
  }

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
    this.currentStep === this.lastStep ? this.modalButtonText = 'Finalizar' : this.modalButtonText = 'Siguiente';
  }

  updateButton() {
    switch(this.currentStep) {
      case 1:
        this.buttonIsDisbaled = !(this.email?.valid && this.password?.valid);
        break;
      case 2:
        this.buttonIsDisbaled = !(this.name?.valid && this.address?.valid && this.phone?.valid);
        break;
      case 3:
        this.oneCategoryChecked = (this.categos as FormArray).length > 0;
        this.buttonIsDisbaled = !this.oneCategoryChecked;
        break;
      default:
        this.buttonIsDisbaled = false;
    }
  }

  submit() {
    const userInfo : User = {
      email: this.email?.value,
      password: this.password?.value,
      role_id: 2
    }

    this.usersService.postNewUser(userInfo).pipe(
      switchMap(newUser => {
        const businessInfo : Partial<Business> = {
          name: this.name?.value,
          address: this.address?.value,
          phone: this.phone?.value,
          usuario_id: newUser.id
        }
        return this.businessService.postNewBusiness(businessInfo).pipe(
          switchMap(newBusiness => {
            const categories = {
              categories: this.categos?.value,
              comercio_id: newBusiness.id
            };
            const data = {
              comercio_id: newBusiness.id
            };

            return forkJoin([
              this.businessService.postBusinessCategories(categories),
              this.usersService.updateUserInformation(data, newBusiness.usuario_id || 0)
            ]);
          })
        );
      })
    ).subscribe({
      next: result => console.log(result),
      error: err => console.error(err)
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
