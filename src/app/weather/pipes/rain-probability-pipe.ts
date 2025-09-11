import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rainProbability'
})
export class RainProbabilityPipe implements PipeTransform {

  transform(value: number): string {
    if (value || value === 0) {
      return `${Math.round(value * 100)}`;
    }

    return '-'
  }

}
