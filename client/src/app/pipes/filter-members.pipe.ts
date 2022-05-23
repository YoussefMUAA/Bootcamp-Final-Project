import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterMembers'
})
export class FilterMembersPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultFilter = [];

    for (const filter of value) {
      if (`${filter.name} ${filter.surname}`.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(filter);
      }
    }

    return resultFilter;
  }

}
