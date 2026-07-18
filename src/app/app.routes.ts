import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TopicOutletComponent } from './common-ui/outlets/topic-outlet/topic-outlet.component';
import { DirectivePageComponent } from './pages/directive-page/directive-page.component';
import { PipePageComponent } from './pages/pipe-page/pipe-page.component';
import { InOutPageComponent } from './pages/in-out-page/in-out-page.component';

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
            { path: 'directive', component: DirectivePageComponent },
            { path: 'pipe', component: PipePageComponent },
            { path: 'in-out', component: InOutPageComponent }
        ]
    }
];
