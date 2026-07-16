import { Component } from '@angular/core';
import { HighlightDirective } from "../../common-ui/directives/highlight.directive";
import { TogglePasswordDirective } from "../../common-ui/directives/toggle-password.directive";
import { AutoFocusDirective } from "../../common-ui/directives/auto-focus.directive";
import { AutoResizeDirective } from "../../common-ui/directives/auto-resize.directive";
import { SvgComponent } from "../../common-ui/extra/svg.component";

@Component({
    selector: 'app-directive-page',
    imports: [HighlightDirective, TogglePasswordDirective, AutoFocusDirective, AutoResizeDirective, SvgComponent],
    templateUrl: './directive-page.component.html',
    styleUrl: './directive-page.component.scss',
})
export class DirectivePageComponent {
    readonly number = 50;
}
