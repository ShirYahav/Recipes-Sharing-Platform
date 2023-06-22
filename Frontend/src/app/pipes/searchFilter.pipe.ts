import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], searchText: string): any[] {
    if (!list) { return []; }
    if (!searchText) { return list; }
  
    searchText = searchText.toLowerCase();
    let response = list.filter( recipe => {
      return recipe.title.toLowerCase().includes(searchText);
    });
    
    return response;
  }

}
