import { Component } from '@angular/core';
import { CopySelectDirective } from './directives/copy-select.directive';

@Component({
    selector: 'app-host-page',
    imports: [CopySelectDirective],
    templateUrl: './host-page.component.html',
    styleUrl: './host-page.component.scss',
})
export class HostPageComponent {}
