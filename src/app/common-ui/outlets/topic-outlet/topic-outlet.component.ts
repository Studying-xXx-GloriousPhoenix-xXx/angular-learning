import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { SvgComponent } from "../../extra/svg.component";

@Component({
    selector: 'app-topic-outlet',
    imports: [RouterOutlet, RouterLinkWithHref, SvgComponent],
    templateUrl: './topic-outlet.component.html',
    styleUrl: './topic-outlet.component.scss',
})
export class TopicOutletComponent {}
