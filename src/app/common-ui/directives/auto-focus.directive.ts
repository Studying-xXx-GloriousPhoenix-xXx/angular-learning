import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
    selector: '[appAutoFocus]',
    standalone: true
})
export class AutoFocusDirective {
    private hostElement = inject<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(ElementRef);
    condition = input<boolean>(true, { alias: 'appAutoFocus' });
    delay = input<number>(0);

    constructor() {
        effect(() => {
            const shouldFocus = this.condition();
            const delayTime = this.delay();
            const element = this.hostElement.nativeElement;

            if (shouldFocus) {
                setTimeout(() => {
                    element.focus();
                }, delayTime);
            }
        })
    }
}
