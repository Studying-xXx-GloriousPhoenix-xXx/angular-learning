import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TopicOutletComponent } from './common-ui/outlets/topic-outlet/topic-outlet.component';

export const routes: Routes = [
    {
        path: "",
        component: HomePageComponent,
        pathMatch: "full"
    },
    {
        path: "topic",
        component: TopicOutletComponent,
        children: []
    }
];
