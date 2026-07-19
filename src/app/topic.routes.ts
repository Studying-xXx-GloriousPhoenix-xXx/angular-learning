import { Routes } from '@angular/router';
import { DirectivePageComponent } from './pages/directive-page/directive-page.component';
import { PipePageComponent } from './pages/pipe-page/pipe-page.component';
import { InOutPageComponent } from './pages/in-out-page/in-out-page.component';
import { LifecyclePageComponent } from './pages/lifecycle-page/lifecycle-page.component';
import { ViewChildPageComponent } from './pages/view-child-page/view-child-page.component';
import { HostPageComponent } from './pages/host-page/host-page.component';
import { RXJS_ROUTES } from './rxjs.routes';
import { RxjsOutletComponent } from './common-ui/outlets/rxjs-outlet/rxjs-outlet.component';

export const TOPIC_ROUTES: Routes = [
    { path: 'directive', component: DirectivePageComponent },
    { path: 'pipe', component: PipePageComponent },
    { path: 'in-out', component: InOutPageComponent },
    { path: 'lifecycle', component: LifecyclePageComponent },
    { path: 'view-child', component: ViewChildPageComponent },
    { path: 'host', component: HostPageComponent },
    { 
        path: 'rxjs',
        component: RxjsOutletComponent,
        children: RXJS_ROUTES
    },
];