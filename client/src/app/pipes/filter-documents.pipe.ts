import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterDocuments'
})
export class FilterDocumentsPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    const resultFilter = [];

    for (const filter of value) {
      if (filter.doc_title.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultFilter.push(filter);
      }
    }

    return resultFilter;
  }

}
