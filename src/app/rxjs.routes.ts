import { Routes } from "@angular/router";
import { SafeSendPageComponent } from "./pages/rxjs-page/basic/safe-send-page/safe-send-page.component";
import { SmartSearchPageComponent } from "./pages/rxjs-page/basic/smart-search-page/smart-search-page.component";
import { LoadManagerPageComponent } from "./pages/rxjs-page/advanced/load-manager-page/load-manager-page.component";

export const RXJS_ROUTES: Routes = [
    { path: '', redirectTo: 'basic', pathMatch: 'full' },
    {
        path: 'basic',
        children: [
            { path: '', redirectTo: 'safe-send', pathMatch: 'full' },
            { path: 'safe-send', component: SafeSendPageComponent },
            { path: 'smart-search', component: SmartSearchPageComponent }
        ]
    },
    {
        path: 'advanced',
        children: [
            { path: '', redirectTo: 'load-manager', pathMatch: 'full' },
            { path: 'load-manager', component: LoadManagerPageComponent }
        ]
    }
]