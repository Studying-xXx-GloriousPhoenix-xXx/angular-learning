import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TopicOutletComponent } from './common-ui/outlets/topic-outlet/topic-outlet.component';
import { DirectivePageComponent } from './pages/directive-page/directive-page.component';

export const routes: Routes = [
    { path: "", redirectTo: 'home', pathMatch: 'full' },
    {
        path: "home",
        component: HomePageComponent,
    },
    {
        path: "topic",
        component: TopicOutletComponent,
        children: [
            { path: 'directive', component: DirectivePageComponent }
        ]
    }
];
