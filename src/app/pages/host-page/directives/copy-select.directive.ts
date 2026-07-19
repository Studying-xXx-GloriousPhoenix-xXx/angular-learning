import { Directive, ElementRef, inject, signal } from '@angular/core';

@Directive({
    selector: '[appCopySelect]',
    host: {
        '[style.cursor]': '"pointer"',
        '[style.transition]': '"100ms"',
        '[style.color]': 'isCopied() ? "var(--color-accent)" : "var(--color-text)"',
        '[style.textDecoration]': 'isHovered() ? "underline" : "none"',

        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()',
        '(click)': 'onElementClick($event)',
        '(window:keydown.escape)': 'onGlobalEscape()'
    },
})
export class CopySelectDirective {
    private element = inject(ElementRef);
    protected isHovered = signal<boolean>(false);
    protected isCopied = signal<boolean>(false);
    private timeoutId: any;

    onMouseEnter() { this.isHovered.set(true); }
    onMouseLeave() { this.isHovered.set(false); }
    onElementClick(event: MouseEvent) {
        event.stopPropagation();

        const text = this.element.nativeElement.innerText;
        navigator.clipboard.writeText(text);

        this.isCopied.set(true);

        if (this.timeoutId) clearTimeout(this.timeoutId);

        setTimeout(() => {
            this.isCopied.set(false);
        }, 2000);
    }
    onGlobalEscape() {
        if (this.isCopied()) {
            this.isCopied.set(false);
            if (this.timeoutId) clearTimeout(this.timeoutId);
        }
    }
}
