import { Component, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NavbarComponent } from '../../../Layout/navbar/navbar.component';
import { FooterComponent } from '../../../Layout/footer/footer.component';
import { Category } from '../../../Interfaces/category';
import { CategoriesService } from '../../../Services/Categories/categories.service';
import { CategoryCheckboxComponent } from '../../../Components/Utils/category-checkbox/category-checkbox.component';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CancelCompleteProfileModalComponent } from '../../../Components/Modals/cancel-complete-profile/cancel-complete-profile-modal/cancel-complete-profile-modal.component';
import { ModalService } from '../../../Services/modal.service';
import { UsersService } from '../../../Services/Users/users.service';
import { BusinessService } from '../../../Services/Business/business.service';
import { forkJoin, switchMap } from 'rxjs';
import { Business } from '../../../Interfaces/business';
import { User } from '../../../Interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-business-profile',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    CategoryCheckboxComponent,
    ReactiveFormsModule
  ],
  templateUrl: './complete-business-profile.component.html',
  styleUrl: './complete-business-profile.component.scss'
})
export class CompleteBusinessProfileComponent implements OnInit {

  @ViewChild('cancelModalContainer', { read: ViewContainerRef, static: true }) cancelModalContainer!: ViewContainerRef;
  componentRef!: ComponentRef<CancelCompleteProfileModalComponent>;
  businessRegisterForm!: FormGroup;
  categories: Category[] = [];
  maxCategories: number = 3;
  maxCategoriesSelected: boolean = false;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private modalService: ModalService,
    private usersService: UsersService,
    private businessService: BusinessService,
    private router: Router
  ) {}

  get minPrice() {
    return this.businessRegisterForm.get('minPrice');
  }
  get maxPrice() {
    return this.businessRegisterForm.get('maxPrice');
  }
  get openingTime() {
    return this.businessRegisterForm.get('openingTime');
  }
  get closingTime() {
    return this.businessRegisterForm.get('closingTime');
  }
  get description() {
    return this.businessRegisterForm.get('description');
  }
  get selectedCategories() {
    return this.businessRegisterForm.get('categories') as FormArray;
  }

  ngOnInit(): void {
    this.fetchCategories();
    this.buildForm();
    this.getBusinessData();
  }

  fetchCategories() {
    this.categoriesService.getCategories().subscribe(x => this.categories = x);
  }

  getBusinessData() {
    this.data = history.state.data;
    console.log(this.data);
  }

  buildForm() {
    this.businessRegisterForm = this.formBuilder.group({
      minPrice: ['', [Validators.required, Validators.min(1)]],
      maxPrice: ['', [Validators.required, Validators.min(1)]],
      openingTime: ['', Validators.required],
      closingTime: ['', Validators.required],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(500)
        ]
      ],
      categories: this.formBuilder.array([])
    });
  }

  openCancelModal() {
    this.cancelModalContainer.clear();
    this.componentRef = this.cancelModalContainer.createComponent(CancelCompleteProfileModalComponent);
    this.modalService.openModal('cancelCompleteProfile');
  }

  onCategorySelected(isChecked: boolean, name: string) {
    if (isChecked) {
      if(this.selectedCategories.length < this.maxCategories) {
        this.selectedCategories.push(new FormControl(name));
      }
      if (this,this.selectedCategories.length === 3) {
        this.maxCategoriesSelected = true;
      }
    } else {
      let index = this.selectedCategories.controls.findIndex(x => x.value === name);
      this.selectedCategories.removeAt(index);
    }
    console.log(this.selectedCategories.value);
  }

  submit() {
    if (this.businessRegisterForm.valid) {
      console.log(this.businessRegisterForm.getRawValue());

      const userInfo : User = {
        email: this.data.email,
        password: this.data.password,
        role_id: 2
      }

      console.log(userInfo);

      this.usersService.postNewUser(userInfo).pipe(
        switchMap(newUser => {
          const businessInfo : Business = {
            name: this.data.name,
            address: this.data.address,
            phone: this.data.phone,
            usuario_id: newUser.id,
            workingHours: {
              opening: this.openingTime?.value,
              closing: this.closingTime?.value
            },
            description: this.description?.value
          }
          return this.businessService.postNewBusiness(businessInfo).pipe(
            switchMap(newBusiness => {
              const categories = {
                categories: this.selectedCategories?.value,
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
        next: () => this.router.navigate(['/']),
        error: err => console.error(err)
      });
    }
  }

  cancel() {
    this.openCancelModal();
  }

}
