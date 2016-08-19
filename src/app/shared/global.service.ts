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
  constructor() {
    this.toggle = false;
    this.navClicked = false;
    this.width = window.innerWidth;
    this.username = "USER";
    this.ticket_number = 0;
  }
}
