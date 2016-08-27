import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../shared/global.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'app-ticket-form',
  templateUrl: 'ticket-form.component.html',
  styleUrls: ['ticket-form.component.css'],
})

export class TicketFormComponent implements OnInit  {

  form = {
    title: '',
    date: '',
    customer: '',
    email: '',
    employee: '',
    description: ''
  };
  submitted = false;
  ticket_length = 0;
  error = [];
  openTicket = 0;

  constructor(private globalService: GlobalService, public af: AngularFire, private router: Router) {
    af.database.list('/shared/ticket').subscribe(ticket => {
      globalService.ticket_number = ticket.length;
      this.ticket_length = ticket.length;
    });
    af.database.object('/shared').subscribe(num => {
      this.openTicket = num.openTicket;
    });
  }

  ngOnInit() {
    jQuery('#datePicker1')
        .datetimepicker({
          language: 'pt-BR'
        });
    console.log('inited!');
  }

  clearForm() {
    for (var i in this.form) {
      this.form[i] = '';
    }
    this.error = [];
  }

  onSubmit(value) {
    this.form.date = value;
    console.log(this.form);
    this.onSubmitValid();
    if (this.error.length==0) {
      this.af.database.object('/shared/ticket/'+this.ticket_length).update({
        customer: this.form.customer,
        description: this.form.description,
        email: this.form.email,
        employee: this.form.employee,
        id: this.ticket_length+1,
        title: this.form.title,
        start_date: new Date(this.form.date).getTime()/1000,
        end_date: 'active'
      });
      this.af.database.object('/shared').update({ openTicket: this.openTicket+1 });
      this.submitted = true;
      setTimeout(()=> this.router.navigate(['/page/ticket']), 3000);
    }
  }

  onSubmitValid() {
    this.error = [];
    for (var i in this.form) {
      if (this.form[i]=='') {
        this.error.push('Please finish the form');
        return;
      }
    }
    var tmp = this.form.date.split('/');
    var days = ['31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];
    if (tmp.length!=3) {
      this.error.push('Date format should be mm/dd/yyyy');
      return;
    }
    var year = tmp[2];
    var nowyear = new Date().getFullYear()+'';
    if (year<'2010' || year>nowyear) {
      this.error.push('Please enter a valid date');
      return;
    }
    var month = tmp[0];
    if (month.charAt(0)=='0') {
      month = month.charAt(1);
    }
    if (Number(month)<1 || Number(month)>12) {
      this.error.push('Please enter a valid date');
      return;
    }
    var day = tmp[1];
    if (Number(year)%4==0) {
      days[1] = '29';
    }
    if (day<'01' || day>days[Number(month)]) {
      this.error.push('Please enter a valid date');
    }
    var re = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;
    if (!re.test(this.form.email)) {
      this.error.push('Please enter a valid email address');
      return;
    }
  }

}
