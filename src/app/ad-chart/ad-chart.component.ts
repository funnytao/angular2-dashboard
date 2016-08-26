import { Component, OnInit } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';

import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts'; 

@Component({
  moduleId: module.id,
  selector: 'app-ad-chart',
  templateUrl: 'ad-chart.component.html',
  styleUrls: ['ad-chart.component.css'],
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class AdChartComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';

}
