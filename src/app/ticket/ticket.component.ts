import { Component, AfterViewChecked, SimpleChange } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { GlobalService } from '../shared/global.service';
declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'app-ticket',
  templateUrl: 'ticket.component.html',
  styleUrls: ['ticket.component.css'],
  directives: [ ROUTER_DIRECTIVES ]
})
export class TicketComponent implements AfterViewChecked  {

  ngAfterViewChecked() {

  }

  constructor(private globalService: GlobalService) {

  }

}
