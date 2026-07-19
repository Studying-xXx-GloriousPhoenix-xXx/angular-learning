import { Component, DestroyRef, ElementRef, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, delay, distinctUntilChanged, exhaustMap, fromEvent, Observable, of, switchMap, tap } from 'rxjs';

@Component({
    selector: 'app-rxjs-page',
    imports: [ReactiveFormsModule],
    templateUrl: './rxjs-page.component.html',
    styleUrl: './rxjs-page.component.scss',
})
export class RxjsPageComponent {
    searchControl = new FormControl('');
    users = signal<string[]>([]);
    isLoading = signal<boolean>(false);

    submitButton = viewChild.required<ElementRef<HTMLButtonElement>>('submitBtn');
    isSending = signal<boolean>(false);
    statusMessage = signal<string>('');
  
    private destroyRef = inject(DestroyRef);
  
    ngOnInit() {
        this.searchControl.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(query => {
                if (!query || query.length <= 3) {
                    this.isLoading.set(false);
                    return of([]);
                }

                this.isLoading.set(true);

                return this.mockSearchApi(query).pipe(
                    catchError(() => {
                        this.isLoading.set(false);
                        return of([]);
                    })
                )
            }),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(results => {
            this.users.set(results);
            this.isLoading.set(false);
        });
    }
  
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

    private mockSearchApi(query: string): Observable<string[]> {
        this.isLoading.set(true);
        
        const allUsers = ["Олексій", "Олександр", "Анна", "Антон", "Борис", "Володимир", "Дмитро", "Олена"];
        const filtered = allUsers.filter(user => 
            user.toLowerCase().includes(query.toLowerCase())
        );
    
        return of(filtered).pipe(delay(1000));
    }

    private mockSubmitApi(): Observable<string> {
        this.isSending.set(true);
        return of('Success').pipe(delay(3000));
    }
}
