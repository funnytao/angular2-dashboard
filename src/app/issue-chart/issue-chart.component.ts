import { Component, OnInit } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';

@Component({
  moduleId: module.id,
  selector: 'app-issue-chart',
  templateUrl: 'issue-chart.component.html',
  styleUrls: ['issue-chart.component.css'],
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class IssueChartComponent implements OnInit {

  constructor(public af: AngularFire) {
    af.database.object('shared/issueChart').subscribe(item=> {
      var labels = [];
      var data = [];
      for (var i in item) {
        if (i!='$key') {
          labels.push(i+'');
          data.push(item[i]);
        }
      }
      this.barChartLabels = labels;
      this.barChartData[0].data = data;
    });
  }

  ngOnInit() {
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = [];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = false;
  public lineChartColours:Array<any> = [
    { // grey
      backgroundColor: 'rgba(28,175,154,1)',
      borderColor: 'rgba(28,175,154,1)',
      pointBackgroundColor: 'rgba(28,175,154,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(28,175,154,0.2)'
    },
  ];

  public barChartData:any[] = [
    {data: [], label:'Reported Issues'}
  ];

}
