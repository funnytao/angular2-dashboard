import { Component, OnInit } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';

@Component({
  moduleId: module.id,
  selector: 'app-customer-chart',
  templateUrl: 'customer-chart.component.html',
  styleUrls: ['customer-chart.component.css'],
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class CustomerChartComponent implements OnInit {

  constructor(public af: AngularFire) {
    af.database.object('shared/customerChart').subscribe(item=> {
      var labels = [];
      var data = [];
      for (var i in item) {
        if (i!='$key') {
          labels.push(i+'');
          data.push(item[i]);
        }
      }
      this.lineChartLabels = labels;
      this.lineChartData[0].data = data;
    });
  }

  ngOnInit() {
  }

  // lineChart
  public lineChartData:Array<any> = [
    {data: [], label:'Paying Customers'}
  ];
  public lineChartLabels:Array<any> = [];
  public lineChartOptions:any = {
    animation: false,
    responsive: true
  };
  public lineChartColours:Array<any> = [
    { // grey
      backgroundColor: 'rgba(51,65,78,0.8)',
      borderColor: 'rgba(51,65,78,1)',
      pointBackgroundColor: 'rgba(51,65,78,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(51,65,78,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  // events
  // public chartClicked(e:any):void {
  //   console.log(e);
  // }
  //
  // public chartHovered(e:any):void {
  //   console.log(e);
  // }

}
