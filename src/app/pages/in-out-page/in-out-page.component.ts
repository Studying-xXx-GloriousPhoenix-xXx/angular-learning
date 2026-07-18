import { Component, computed, signal } from '@angular/core';
import { TipCalculatorComponent } from './tip-calculator/tip-calculator.component';
import { DemoCardComponent } from "../../common-ui/components/demo-card/demo-card.component";

@Component({
    selector: 'app-in-out-page',
    imports: [TipCalculatorComponent, DemoCardComponent],
    templateUrl: './in-out-page.component.html',
    styleUrl: './in-out-page.component.scss',
})
export class InOutPageComponent {
    totalPrice = signal<number>(1000);
    activePercent = signal<number>(10);

    calculatedTip = computed(() => {
        return (this.totalPrice() * this.activePercent()) / 100;
    });
}
