import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable, count, defer, delay, of, retry, tap, timer } from 'rxjs';
import { throwError } from 'rxjs/internal/observable/throwError';

@Component({
    selector: 'app-retry-fetch-page',
    imports: [JsonPipe],
    templateUrl: './retry-fetch-page.component.html',
    styleUrl: './retry-fetch-page.component.scss',
})
export class RetryFetchPageComponent {
    protected isLoading = signal<boolean>(false);
    protected attemptCount = signal<number>(0);
    protected dataResult = signal<any>(null);
    protected errorMessage = signal<string>('');

    private destroyRef = inject(DestroyRef);
    private currentServerAttempts = 0;

    protected loadData() {
        this.isLoading.set(true);
        this.errorMessage.set('');
        this.dataResult.set(null);
        this.attemptCount.set(0); 
        this.currentServerAttempts = 0;
    
        this.fetchFromNetwork().pipe(
            retry({
                count: 3,
                delay: (error: string, retryCount: number) => {
                    this.attemptCount.set(retryCount + 1);
                    return timer(1000 * Math.pow(2, retryCount));
                }
            }),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe({
            next: (data) => {
                this.dataResult.set(data);
                this.isLoading.set(false);
            },
            error: (err) => {
                this.errorMessage.set(err.message || err);
                this.isLoading.set(false);
            }
        });
    }

    private fetchFromNetwork(): Observable<{ status: string; balance: number }> {
        return defer(() => {
            this.currentServerAttempts++;
            if (this.attemptCount() === 0) this.attemptCount.set(1);
            
            if (this.currentServerAttempts < 4) {
                return throwError(() => new Error('Код 503: Сервер тимчасово недоступний'));
            }
            return of({ status: 'success', balance: 14500 });
        });
    }
}
