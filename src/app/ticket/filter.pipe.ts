import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter',
    pure: false
})

export class MyFilterPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
      var count = 0;
      localStorage.setItem('tickets_number', count+'');
      if (args[0]=="active") {
        return items.filter(item => {
          if (item.end_date=='active') {
            count++;
            localStorage.setItem('tickets_number', count+'');
            return true;
          }
        });
      }
      else if (args[0]=="closed") {
        return items.filter(item => {
          if (item.end_date!='active') {
            count++;
            localStorage.setItem('tickets_number', count+'');
            return true;
          }
        });
      }
      else if (args[0]=='filter' || args[1]=='') {
        return items.filter(item => {
          count++;
          localStorage.setItem('tickets_number', count+'');
          return true;
        });
      }
      else if (args[0]=='date') {
        return items.filter(item => {
          var date = new Date(item.start_date * 1000);
          var year = date.getFullYear();
          var month = date.getMonth()+1+'';
          if (month.length==1) {
            month = '0'+month;
          }
          var day = date.getDate()+'';
          if (day.length==1) {
            day = '0'+day;
          }
          var datestring = month+'/'+day+'/'+year;
          if (datestring==args[1]) {
            count++;
            localStorage.setItem('tickets_number', count+'');
            return true;
          }
        })
      }
      else {
        return items.filter(item => {
          if (item[args[0]].toLowerCase().indexOf(args[1].toLowerCase()) !== -1) {
            count++;
            localStorage.setItem('tickets_number', count+'');
            return true;
          }
        });
      }
    }
}
