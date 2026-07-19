import { Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, exhaustMap, tap, delay, Observable, of } from 'rxjs';

@Component({
    selector: 'app-safe-send-page',
    imports: [],
    templateUrl: './safe-send-page.component.html',
    styleUrl: './safe-send-page.component.scss',
})
export class SafeSendPageComponent {
    submitButton = viewChild.required<ElementRef<HTMLButtonElement>>('submitBtn');
    isSending = signal<boolean>(false);
    statusMessage = signal<string>('');

    private destroyRef = inject(DestroyRef);
  
    ngAfterViewInit() {
        fromEvent(this.submitButton().nativeElement, 'click').pipe(
            exhaustMap(() =>
                this.mockSubmitApi().pipe(
                    tap(() => {
                        this.isSending.set(false);
                        this.statusMessage.set('✅ Звіт успішно доставлений на сервер!');
                    }),
                    delay(4000),
                    tap(() => this.isSending.set(false))
                )
            ),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe()
    }

    private mockSubmitApi(): Observable<string> {
        this.isSending.set(true);
        return of('Success').pipe(delay(3000));
    }
}
