import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
    selector: '[appAutoResize]',
    standalone: true,
    host: {
        '(input)': 'onInput($event)'
    }
})
export class AutoResizeDirective {
    private hostElement = inject<ElementRef<HTMLTextAreaElement>>(ElementRef);
    maxHeight = input<number>(300);

    onInput(event: Event) {
        const textarea = this.hostElement.nativeElement;

        textarea.style.height = 'auto';
        textarea.style.resize = 'none';

        if (textarea.scrollHeight > this.maxHeight()) {
            textarea.style.overflowY = 'scroll';
            textarea.style.height = this.maxHeight() + 'px';
        }
        else {
            textarea.style.overflowY = 'hidden';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }
}
