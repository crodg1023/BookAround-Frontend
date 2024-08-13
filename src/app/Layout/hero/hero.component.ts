import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../../Services/modal.service';
import { ModalTypes } from '../../Interfaces/modal-types';
import { BusinessRegisterComponent } from '../../Components/Modals/business-register/business-register.component';
import { ScrollService } from '../../Services/Scroll/scroll.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

  @ViewChild('businessRegisterContainer', { read: ViewContainerRef, static: true }) businessRegisterContainer!: ViewContainerRef;
  private componentRef!: ComponentRef<BusinessRegisterComponent>;

  constructor(private router: Router, private modalService: ModalService, private scrollService: ScrollService) {}

  onGoToBusinessClick() {
    this.router.navigate(['/business']);
  }

  onRegisterMyBusinessClick() {
    this.businessRegisterContainer.clear();
    this.componentRef = this.businessRegisterContainer.createComponent(BusinessRegisterComponent);
    this.modalService.openModal(ModalTypes.BusinessRegister);
  }

  scrollTo(section: string) {
    this.scrollService.scrollTo(section);
  }
}
