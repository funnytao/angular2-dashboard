import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'recentChat',
    pure: false
})

export class RecentChatPipe implements PipeTransform {
    transform(array: any[], args: any): any[] {
    array.sort((a, b) => {
      if (a.updateTime < b.updateTime) {
          return -1;
      //.completed because we want to sort the list by completed property
      }
      else if (a.updateTime > b.updateTime) {
          return 1;
      }
      else {
          return 0;
      }
    });
    return array;
  }
}
