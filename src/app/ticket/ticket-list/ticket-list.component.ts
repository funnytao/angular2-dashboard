import { Component, AfterViewChecked, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../shared/global.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { DateFormatPipe } from '../ticket.pipe';
import { OrderBy } from '../sort.pipe';
import { MyFilterPipe } from '../filter.pipe';
import { Subject } from 'rxjs/Subject';
declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'app-ticket-list',
  templateUrl: 'ticket-list.component.html',
  styleUrls: ['ticket-list.component.css'],
  pipes: [ DateFormatPipe, OrderBy, MyFilterPipe ],
})
export class TicketListComponent implements AfterViewChecked  {
  datePickerInit = false;
  order = '-start_date';
  ticket_detail;
  filter = 'filter';
  filterText = '';
  ticketsPerPage = 15;
  pageTag = 1;
  currentPage = 1;
  ticket_id = -1;
  ticket_length = 0;
  tickets = [];
  username: FirebaseObjectObservable<any>;
  constructor(private globalService: GlobalService, public af: AngularFire, private router: Router) {
    var url = '/private/'+localStorage.getItem('uid');
    this.username = af.database.object(url);
    af.database.list('/shared/ticket').subscribe(ticket => {
      this.tickets = ticket;
      globalService.ticket_number = ticket.length;
      this.ticket_length = ticket.length;
    });
  }

  queryBy(order) {
    if (this.order==order) {
      this.order = '-'+this.order;
    }
    else {
      this.order = order;
    }
  }

  maxPage() {
    return Math.round(this.ticket_length/this.ticketsPerPage);
  }

  onFilterChange(filter) {
    this.filter = filter;
    jQuery('.input-append.date').attr('id', 'datePicker');
  }

  filterBy(value: HTMLInputElement, filter) {
    this.filter = filter;
    this.filterText = value.value;
    this.currentPage = 1;
    this.pageTag = 1;
  }

  onPageNav(value: number) {
    if (this.pageTag+value>0 && this.pageTag+value<=this.ticket_length/this.ticketsPerPage) {
      this.pageTag = this.pageTag + value;
      this.currentPage = this.pageTag;
    }
  }

  showDatePicker() {
    jQuery('.input-append.date').attr('id', 'datePicker1');
    this.filter = 'date';
  }

  onPageChange(value: number) {
    this.currentPage = value;
  }

  viewTicket(value) {
    this.ticket_id = value.id;
    this.ticket_detail = value;
  }

  comment(name: string, value: HTMLInputElement) {
    var tmp = this.ticket_detail.reply || [];
    tmp.push({
      username: this.globalService.username,
      content: value.value
    });
    value.value = null;
    this.ticket_detail.reply = tmp;
    this.af.database.object('/shared/ticket/'+this.ticket_id).update({ reply: tmp });
  }

  pageSetup(page: number) {
    this.ticketsPerPage = page;
    this.currentPage = 1;
    this.pageTag = 1;
  }

  onSolve() {
    var datenow = Math.floor(Date.now()/1000);
    this.ticket_detail.end_date = datenow;
    this.af.database.object('/shared/ticket/'+this.ticket_id).update({ end_date: datenow });
  }

  ngAfterViewChecked() {
    // console.log('changed');
    if (!this.datePickerInit) {
      jQuery('#datePicker1')
          .datetimepicker({
            language: 'pt-BR',
            maskInput: false,
          });
      this.datePickerInit = true;
      console.log('inited!');
      jQuery('.input-append.date').attr('id', 'datePicker');
    }
    if (this.ticket_length!=Number(localStorage.getItem('tickets_number'))) {
      setTimeout(_ => {
        this.ticket_length = Number(localStorage.getItem('tickets_number'));
      });
    }
  }

}
