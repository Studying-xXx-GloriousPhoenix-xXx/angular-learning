import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneFormatter',
})
export class PhoneFormatterPipe implements PipeTransform {
    transform(value: string | number, code: 'UA' | 'USA' = 'UA'): string {
        let cleaned = value.toString()
            .replace(/\D/g, '');

        switch (code) {
            case 'UA':
            {
                if (cleaned.startsWith('380')) {
                    cleaned = cleaned.slice(3);
                } else if (cleaned.startsWith('0')) {
                    cleaned = cleaned.slice(1);
                }

                const parts = cleaned.match(/^(\d{2})(\d{3})(\d{2})(\d{2})$/);
                if (!parts) {
                    this.assertNoMatch(value.toString());
                }
                
                return `+380 (${parts[1]}) ${parts[2]}-${parts[3]}-${parts[4]}`;
            }
            case 'USA':
            {
                if (cleaned.startsWith('1') && cleaned.length === 11) {
                    cleaned = cleaned.slice(1);
                }

                const parts = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
                
                if (!parts) {
                    this.assertNoMatch(value.toString());
                }

                return `+1 (${parts[1]}) ${parts[2]}-${parts[3]}`;
            }
            default:
            {
                this.assertNever(code);
            }
        }

    }

    assertNever(value: never): never {
        throw new Error(`Encountered unexpected country code: ${value}`);
    }

    assertNoMatch(value: string): never {
        throw new Error(`Given number doesn't match country format: ${value}`);
    }
}
