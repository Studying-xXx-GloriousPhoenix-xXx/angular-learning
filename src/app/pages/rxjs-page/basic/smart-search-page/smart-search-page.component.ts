import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { catchError, debounceTime, delay, distinctUntilChanged, Observable, of, switchMap } from 'rxjs';

@Component({
    selector: 'app-smart-search-page',
    imports: [ReactiveFormsModule],
    templateUrl: './smart-search-page.component.html',
    styleUrl: './smart-search-page.component.scss',
})
export class SmartSearchPageComponent {
    searchControl = new FormControl('');
    users = signal<string[]>([]);
    isLoading = signal<boolean>(false);

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

    private mockSearchApi(query: string): Observable<string[]> {
        this.isLoading.set(true);
        
        const allUsers = ["Олексій", "Олександр", "Анна", "Антон", "Борис", "Володимир", "Дмитро", "Олена"];
        const filtered = allUsers.filter(user => 
            user.toLowerCase().includes(query.toLowerCase())
        );
    
        return of(filtered).pipe(delay(1000));
    }
}
