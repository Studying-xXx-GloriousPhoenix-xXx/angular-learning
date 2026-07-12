import { Directive, effect, input, signal } from '@angular/core';

@Directive({
    selector: '[appTogglePassword]',
    standalone: true,
    host: {
        '(click)': 'onClick()',
        'class.is-active': 'isTextVisible()'
    }
})
export class TogglePasswordDirective {
    field = input.required<HTMLInputElement>({ alias: 'appTogglePassword' });
    protected isTextVisible = signal<boolean>(false);
    onClick() {
        this.isTextVisible.update(val => !val);
    }
    constructor() {
        effect(() => {
            const inputEl = this.field();
            inputEl.type = this.isTextVisible() ? 'text' : 'password';
        });
    }
}
