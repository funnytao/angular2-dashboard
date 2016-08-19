import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dateFormat'})
export class DateFormatPipe implements PipeTransform {
  transform(value: number): string {
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var date = new Date(value * 1000);
    var year = date.getFullYear()+'';
    year = year.substring(2);
    var month = months[date.getMonth()];
    var day = date.getDate();
    return ''+month+' '+day+', '+year;
  }
}
