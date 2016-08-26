import { Component, OnInit, OnDestroy } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';
import { Http, Response}  from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';

@Component({
  moduleId: module.id,
  selector: 'app-sales-chart',
  templateUrl: 'sales-chart.component.html',
  styleUrls: ['sales-chart.component.css'],
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class SalesChartComponent implements OnInit {

  public id: any;

  constructor(private _http: Http) {}

  ngOnInit() {
    this.postRandomQuote();
    this.id = setInterval(() => {
      this.postRandomQuote();
    }, 2000);
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  // // events
  // public chartClicked(e:any):void {
  //   console.log(e);
  // }
  //
  // public chartHovered(e:any):void {
  //   console.log(e);
  // }

  randomData() {
    var max = 500, min = 100;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  postRandomQuote() {
    var randomQuote = {data: [this.randomData(), this.randomData(), this.randomData()]}
    this._http.post('https://api.myjson.com/bins', JSON.stringify(randomQuote), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    }).subscribe(data => {
      this._http.get(data.json().uri)
        .map(res => res.text())
        .subscribe(
          data => this.doughnutChartData = JSON.parse(data).data,
          err => console.log(err)
        );
    });
  }

}
