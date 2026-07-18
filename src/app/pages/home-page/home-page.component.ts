import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { TOPIC_ROUTES } from '../../topic.routes';

@Component({
    selector: 'app-home-page',
    imports: [RouterLink],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
    protected readonly topics = TOPIC_ROUTES.map(r => r.path);
}
