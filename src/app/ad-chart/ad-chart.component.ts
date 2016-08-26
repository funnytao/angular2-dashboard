import { Component, OnInit, OnDestroy } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';
import { Http, Response}  from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';

@Component({
  moduleId: module.id,
  selector: 'app-ad-chart',
  templateUrl: 'ad-chart.component.html',
  styleUrls: ['ad-chart.component.css'],
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class AdChartComponent implements OnInit {

  public id: any;

  constructor(private _http: Http) {}

  ngOnInit() {
    this.postRandomQuote();
    this.id = setInterval(() => {
      this.postRandomQuote();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  public pieChartLabels:string[] = ['Message', 'Website', 'TV'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';

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
          data => this.pieChartData = JSON.parse(data).data,
          err => console.log(err)
        );
    });
  }

}
