import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GlobalService {
  toggle: boolean;
  navClicked: boolean;
  width: number;
  username: string;
  uid: string;
  ticket_number: number;
<<<<<<< HEAD
  imgUrl: string;
=======
>>>>>>> ef350b95d65b9ad28f7f91bb006de25ee747b507
  constructor() {
    this.toggle = false;
    this.navClicked = false;
    this.width = window.innerWidth;
    this.username = "USER";
    this.ticket_number = 0;
<<<<<<< HEAD
    this.imgUrl = 'http://cdn.bleedingcool.net/wp-content/uploads/2012/09/sam-bain-twitter-avatar.jpeg';
=======
>>>>>>> ef350b95d65b9ad28f7f91bb006de25ee747b507
  }
}
