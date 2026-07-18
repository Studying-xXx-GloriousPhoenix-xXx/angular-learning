import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'cropText',
})
export class CropTextPipe implements PipeTransform {
    transform(value: string, maxLength = 100): string {
        if (!value || value.length <= maxLength) {
            return value;
        }

        let currentLast = maxLength;
        while (currentLast > 0 && value[currentLast] !== ' ') {
            currentLast--;
        }

        if (currentLast === 0) {
            currentLast = maxLength;
        }

        let cropped = value.substring(0, currentLast);
        cropped = cropped.replace(/[,.:;!?]$/, '');

        return cropped + '...';
    }
}
