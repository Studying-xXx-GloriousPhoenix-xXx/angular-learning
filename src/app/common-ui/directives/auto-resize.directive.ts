import { Directive, ElementRef, inject, input } from '@angular/core';

@Directive({
    selector: '[appAutoResize]',
    standalone: true,
    host: {
        '(input)': 'onInput()'
    }
})
export class AutoResizeDirective {
    private hostElement = inject<ElementRef<HTMLTextAreaElement>>(ElementRef);
    maxHeight = input<number>(300);

    ngOnInit() {
        this.hostElement.nativeElement.style.resize = 'none';
    }

    onInput() {
        const textarea = this.hostElement.nativeElement;

        textarea.style.height = 'auto';

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
