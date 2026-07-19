import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {concatMap, debounceTime, delay, distinctUntilChanged, Observable, of, tap } from 'rxjs';

@Component({
    selector: 'app-autosave-page',
    imports: [ReactiveFormsModule],
    templateUrl: './autosave-page.component.html',
    styleUrl: './autosave-page.component.scss',
})
export class AutosavePageComponent {
    protected autosaveField = new FormControl<string>('');
    protected saveStatus = signal<string>('All changes saved');
    protected savedText = signal<string>('');
    private destroyRef = inject(DestroyRef);
    ngOnInit() {
        this.autosaveField.valueChanges.pipe(
            debounceTime(1500),
            distinctUntilChanged(),
            concatMap(value => {
                const safeText = value ?? "";
                this.saveStatus.set(safeText === '' ? 'Clearing draft...' : 'Saving...');
                return this.saveDraft(safeText);
            }),
            takeUntilDestroyed(this.destroyRef)
        ).subscribe(response => {
            this.saveStatus.set(response)
        });
    }
    private saveDraft(text: string): Observable<string> {
        const backendResponse = text === '' ? 'Draft cleared!' : 'All changes saved';
        return of(backendResponse).pipe(
            delay(1000),
            tap(() => this.savedText.set(text))
        );
    }
}
