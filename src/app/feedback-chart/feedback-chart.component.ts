import { Component, OnInit, OnDestroy } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {HTTP_PROVIDERS} from '@angular/http';
import { Http, Response}  from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';

@Component({
  moduleId: module.id,
  selector: 'app-feedback-chart',
  templateUrl: 'feedback-chart.component.html',
  directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class FeedbackChartComponent implements OnInit {

  public id: any;

  constructor(private _http: Http) {}

  ngOnInit() {
    this.postRandomQuote();
    this.id = setInterval(() => {
      this.postRandomQuote();
      // console.log('in');
    }, 3000);
  }

  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  // Radar
  public radarChartLabels:string[] = ['Design', 'Quality', 'Price', 'Service', 'Technology', 'Durability'];

  public radarChartData:any = [
    {data: [65, 59, 90, 81, 56, 55], label: 'feedback'},
  ];
  public radarChartType:string = 'radar';

  randomData() {
    var max = 100, min = 10;
    return Math.floor(Math.random() * (max - min)) + min;
  }

  postRandomQuote() {
    var randomQuote = {data: [this.randomData(), this.randomData(), this.randomData(), this.randomData(), this.randomData(), this.randomData()], label: 'feedback'};
    this._http.post('https://api.myjson.com/bins', JSON.stringify(randomQuote), {
      headers: new Headers({ 'Content-Type': 'application/json' })
    }).subscribe(data => {
      this._http.get(data.json().uri)
        .map(res => res.text())
        .subscribe(
          data => this.radarChartData = [{data: JSON.parse(data).data, label: 'feedback'}],
          err => console.log(err)
        );
    });
  }

}
