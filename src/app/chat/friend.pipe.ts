import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      // console.log(value[key]);
      keys.push({
        imgUrl: value[key].imgUrl,
        lastText: value[key].lastText,
        uid: value[key].uid,
        updateTime: value[key].updateTime,
        username: value[key].username
      });
    }
    return keys;
  }
}
