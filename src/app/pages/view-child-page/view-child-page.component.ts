import { AfterViewInit, Component, ElementRef, viewChild, viewChildren } from '@angular/core';
import { AppCardComponent } from "./app-card/app-card.component";

@Component({
    selector: 'app-view-child-page',
    imports: [AppCardComponent],
    templateUrl: './view-child-page.component.html',
    styleUrl: './view-child-page.component.scss',
})
export class ViewChildPageComponent implements AfterViewInit {
    cardsData = [
        { id: 1, title: 'Кутовий Компонент', desc: 'Вивчаємо декоратори доступу до шаблону.' },
        { id: 2, title: 'ViewChild', desc: 'Шукає перший відповідний елемент або компонент.' },
        { id: 3, title: 'ViewChildren', desc: 'Збирає QueryList із усіх знайдених елементів.' },
    ];

    inputRef = viewChild<ElementRef<HTMLInputElement>>('textInput');
    cards = viewChildren<AppCardComponent>(AppCardComponent);

    ngAfterViewInit(): void {
        this.inputRef()?.nativeElement.focus();
    }

    focusInput() {
        this.inputRef()?.nativeElement.focus();
    }

    clearInput() {
        const inputEl = this.inputRef()?.nativeElement;
        if (inputEl) {
            inputEl.value = '';
            inputEl.focus();
        }
    }

    toggleAllCards() {
        this.cards().forEach(c => {
            c.toggleHighlight();
        });
    }
}
