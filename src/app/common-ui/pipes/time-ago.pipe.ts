import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
    private datePipe = new DatePipe('uk');
    transform(
        baseDate: Date | number | string,
        currDate: Date | number | string | null = Date.now() 
    ): string {
        const safeCurrDate = currDate ?? Date.now();

        if (!baseDate) return '';

        const baseMs = this.extract(baseDate);
        const currMs = this.extract(safeCurrDate);
        const diffMs = currMs - baseMs;

        if (diffMs < 0) return 'Тільки що';

        const seconds = Math.floor(diffMs / 1000);
        if (seconds < 10) return 'Тільки що';
        if (seconds < 60) return 'Менше хвилини тому';

        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) {
            const remainder = minutes % 10;
            const remainder100 = minutes % 100;

            if (remainder100 >= 11 && remainder100 <= 14) {
                return `${minutes} хвилин тому`;
            }
            if (remainder === 1) {
                return `${minutes} хвилину тому`;
            }
            if (remainder >= 2 && remainder <= 4) {
                return `${minutes} хвилини тому`;
            }
            return `${minutes} хвилин тому`;
        }

        const hours = Math.floor(minutes / 60);
        if (hours < 24) {
            const remainder = hours % 10;
            const remainder100 = hours % 100;

            if (remainder100 >= 11 && remainder100 <= 14) {
                return `${hours} годин тому`;
            }
            if (remainder === 1) {
                return `${hours} годину тому`;
            }
            if (remainder >= 2 && remainder <= 4) {
                return `${hours} години тому`;
            }
            return `${hours} годин тому`;
        }

        if (hours < 48) return '1 добу тому';
        if (hours < 72) return '2 доби тому';

        return this.datePipe.transform(baseMs, 'mediumDate') || '';
    }
    private extract(value: Date | number | string): number {
        return typeof value === 'number' 
            ? value 
            : typeof value === 'string' 
                ? new Date(value).getTime() 
                : value.getTime();
    }
}
