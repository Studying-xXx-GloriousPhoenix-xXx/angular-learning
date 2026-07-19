import { Component } from '@angular/core';
import { RXJS_ROUTES } from '../../../rxjs.routes';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-rxjs-outlet',
    imports: [RouterLink, RouterOutlet, RouterLinkActive],
    templateUrl: './rxjs-outlet.component.html',
    styleUrl: './rxjs-outlet.component.scss',
})
export class RxjsOutletComponent {
    protected readonly rxjsTree = RXJS_ROUTES;
}
