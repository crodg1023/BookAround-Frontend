import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  scrollTo(section: string) {
    const sectionToScroll = document.querySelector(`#${section}`);
    if (sectionToScroll) {
      sectionToScroll.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
