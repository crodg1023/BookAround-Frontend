import { Injectable } from '@angular/core';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { Review } from '../../Interfaces/review';

declare global {
  interface Window {
    Echo: Echo;
    Pusher: any;
  }
}

window.Pusher = Pusher;

@Injectable({
  providedIn: 'root'
})
export class EchoService {

  constructor() {
    window.Echo = new Echo({
      broadcaster: 'pusher',
      key: '1a78752577efcb1328d2',
      cluster: 'eu',
      forceTLS: true
    });
  }

  listenForNewReviews(callback: (review: Review) => void) {
    window.Echo.channel('reviewsChannel')
      .listen('NewReviewEvent', (event: any) => callback(event.review));
  }
}
