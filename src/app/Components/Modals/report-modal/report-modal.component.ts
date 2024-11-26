import { Component, Input, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ReportsService } from '../../../Services/Reports/reports.service';
import { ModalService } from '../../../Services/modal.service';

@Component({
  selector: 'app-report-modal',
  standalone: true,
  imports: [
    ModalComponent,
    FormsModule
  ],
  templateUrl: './report-modal.component.html',
  styleUrl: './report-modal.component.scss'
})
export class ReportModalComponent implements OnInit {

  @Input() type: 'business' | 'customer' | 'review' = 'customer';
  buttonText: string = '';
  modalText: string = '';
  reportableID: number = 0;
  reportableOptions: string[] = [
    'Contenido sexual',
    'Contenido violento o repugnante',
    'Contenido que incita al odio',
    'Hostigamiento o acoso',
    'Actividades dañinas o peligrosas',
    'Desinformación',
    'Engañoso o fraudulento'
  ];
  selectedOption: string = this.reportableOptions[0];

  constructor(
    private reportService: ReportsService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.buttonText = `Reportar este ${this.translateType()}`;
    this.modalText = `¿Deseas reportar este ${this.translateType()}?`
  }

  translateType() {
    switch(this.type) {
      case 'business':
        return 'comercio';
      case 'customer':
        return 'usuario';
      case 'review':
        return 'reseña';
    }
  }

  report = () => {
    console.log(this.selectedOption);

    const report = {
      'reportable_id': this.reportableID,
      'reportable_type': this.type,
      'reason': this.selectedOption,
      'usuario_id': sessionStorage.getItem('id')
    }

    this.reportService.createReport(report).subscribe({
      next: () => this.modalService.closeModal('report')
    });
  }
}
