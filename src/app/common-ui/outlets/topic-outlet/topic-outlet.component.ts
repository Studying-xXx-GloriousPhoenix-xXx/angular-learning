import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
    selector: 'app-topic-outlet',
    imports: [RouterOutlet, RouterLinkWithHref],
    templateUrl: './topic-outlet.component.html',
    styleUrl: './topic-outlet.component.scss',
})
export class TopicOutletComponent {}
