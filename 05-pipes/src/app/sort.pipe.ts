import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  standalone: true,
  pure: false // disable caching mechanism, means it updates when internal values in array changes (for example)
})
export class SortPipe implements PipeTransform {

  transform(value: string[] | number[], direction: 'asc' | 'desc' = 'asc') {
    const sorted = [...value]; // create a copy of the array so that we are not modifying the original array
    // sort changes the original array
    sorted.sort((a, b) => {
      if(direction==='asc') {
        return a > b ? 1 : -1;
      } else {
        return a > b ? -1 : 1;
      }
    });
    return sorted;

  }

}
