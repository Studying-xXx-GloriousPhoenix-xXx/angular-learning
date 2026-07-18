import { Component, input } from '@angular/core';

@Component({
    selector: 'app-demo-card',
    templateUrl: './demo-card.component.html',
    styleUrl: './demo-card.component.scss',
})
export class DemoCardComponent {
    goal = input.required<string>();
}
