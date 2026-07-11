import { Component } from '@angular/core';

@Component({
    selector: 'app-home-page',
    imports: [],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
    readonly links: string[] = [
        '123', '456', '789'
    ]
}
