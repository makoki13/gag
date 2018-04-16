import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeHolder',
})
export class PlaceHolderPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, defecto: string = "Sin texto") {
    if (value) return value; else { return defecto; }
    // return ( value ) ? value : defecto ;  
  }
}
