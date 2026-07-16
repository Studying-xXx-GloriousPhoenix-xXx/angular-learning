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
    textarea = this.hostElement.nativeElement;
    maxHeight = input<number>(300);

    ngOnInit() {
        this.textarea.style.resize = 'none';
        this.textarea.style.height = 'auto';
        this.onInput();
    }

    onInput() {
        const style = getComputedStyle(this.textarea);
        const borderHeight = 
            parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
    
        this.textarea.style.height = 'auto';
    
        const newHeight = this.textarea.scrollHeight + borderHeight;
    
        if (newHeight > this.maxHeight()) {
            this.textarea.style.overflowY = 'scroll';
            this.textarea.style.height = this.maxHeight() + 'px';
        }
        else {
            this.textarea.style.overflowY = 'hidden';
            this.textarea.style.height = newHeight + 'px';
        }
    }
}
