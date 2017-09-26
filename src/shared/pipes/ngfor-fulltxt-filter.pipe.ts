import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'fullTextSearch',
  pure: false
})
export class FullTextSearchPipe implements PipeTransform {

  constructor() { }

  transform(value: any, query: string, field: string): any {
    if (!value) return;
    
    var result = [];

    query = (query) ? query.toLowerCase() : query;
    
    for (var i = 0; i < value.length; i++) {

      let containerString = (value[i][field]).toLowerCase();

      if (containerString.indexOf(query) >= 0) {
        result.push(value[i]);
      }
    }
    return (query) ? result : value;
  }
}
