import { Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, interval, map, merge, switchMap, takeUntil } from 'rxjs';

@Component({
    selector: 'app-hold-button-page',
    imports: [],
    templateUrl: './hold-button-page.component.html',
    styleUrl: './hold-button-page.component.scss',
})
export class HoldButtonPageComponent {
    protected counter = signal<number>(0);
    protected actionButton = viewChild.required<ElementRef<HTMLButtonElement>>('actionBtn');

    private destroyRef = inject(DestroyRef);

    ngAfterViewInit() {
        const buttonEl = this.actionButton().nativeElement;
        let totalSeconds = 0;

        const mouseDown$ = fromEvent(buttonEl, 'mousedown');
        const mouseUp$ = fromEvent(buttonEl, 'mouseup');
        const mouseLeave$ = fromEvent(buttonEl, 'mouseleave');

        const stop$ = merge(mouseUp$, mouseLeave$);

        mouseDown$.pipe(
            switchMap(() => {
                return interval(100).pipe(
                    map(() => {
                        totalSeconds += 0.1;
                        return totalSeconds;
                    }),
                    takeUntil(stop$)
                );
            }),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(seconds => {
            this.counter.set(seconds);
        })
    }
}