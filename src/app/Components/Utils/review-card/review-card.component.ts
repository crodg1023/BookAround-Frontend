import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-card.component.html',
  styleUrl: './review-card.component.scss'
})
export class ReviewCardComponent implements AfterViewInit {
  @ViewChild('reviewContent') reviewContent!: ElementRef;
  isTruncated: boolean = false;
  isExpanded: boolean = false;

  ngAfterViewInit(): void {
    setTimeout(() => this.checkIfTruncated());
  }

  checkIfTruncated() {
    const content = this.reviewContent.nativeElement;
    if (content.scrollHeight > content.clientHeight) this.isTruncated = true;
  }
  toggleReadMore() {
    this.isExpanded = !this.isExpanded;
  }
}
