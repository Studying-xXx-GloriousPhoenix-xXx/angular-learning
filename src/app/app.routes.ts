import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TopicOutletComponent } from './common-ui/outlets/topic-outlet/topic-outlet.component';
import { DirectivePageComponent } from './pages/directive-page/directive-page.component';
import { PipePageComponent } from './pages/pipe-page/pipe-page.component';
import { InOutPageComponent } from './pages/in-out-page/in-out-page.component';
import { LifecyclePageComponent } from './pages/lifecycle-page/lifecycle-page.component';
import { ViewChildPageComponent } from './pages/view-child-page/view-child-page.component';
import { TOPIC_ROUTES } from './topic.routes';

export const routes: Routes = [
    { path: "", redirectTo: 'home', pathMatch: 'full' },
    {
        path: "home",
        component: HomePageComponent,
    },
    {
        path: "topic",
        component: TopicOutletComponent,
        children: TOPIC_ROUTES
    }
];
