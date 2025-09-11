import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'windDirection'
})
export class WindDirectionPipe implements PipeTransform {

  transform(deg: number): string {
    if (deg || deg === 0) {
      const cardinalDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      const cardinalIndex = Math.round(deg / 45) % 8;

      return cardinalDirections[cardinalIndex];
    }

    return '-'
  }

}
