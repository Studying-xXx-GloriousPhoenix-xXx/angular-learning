import { Directive, signal } from '@angular/core';

@Directive({
    selector: '[appHighlight]',
    standalone: true,
    host: {
        '(click)': 'onClick()',
        '[class.is-highlighted]': 'isClicked()'
    }
})
export class HighlightDirective {
    protected isClicked = signal<boolean>(false);
    onClick() {
        this.isClicked.update(value => !value);
    }
}
