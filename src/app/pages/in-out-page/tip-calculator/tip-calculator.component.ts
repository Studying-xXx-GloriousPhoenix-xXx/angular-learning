import { Component, input, output } from '@angular/core';

@Component({
    selector: 'app-tip-calculator',
    template: `
        <div style="border: 1px dashed #ccc; padding: 15px;">
            <h4>Child calculator</h4>
            <p>Bill from parent: {{ bill() }} грн</p>
            
            <button (click)="tipSelected.emit(10)">10%</button>
            <button (click)="tipSelected.emit(15)">15%</button>
            <button (click)="tipSelected.emit(20)">20%</button>
        </div>
    `
})
export class TipCalculatorComponent {
    bill = input<number>(0);
    tipSelected = output<number>();
}