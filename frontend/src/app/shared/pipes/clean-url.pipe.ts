import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanUrl',
})
export class CleanUrlPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return 'N/A';

    return value.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
  }
}
