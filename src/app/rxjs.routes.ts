import { Routes } from "@angular/router";
import { SafeSendPageComponent } from "./pages/rxjs-page/basic/safe-send-page/safe-send-page.component";
import { SmartSearchPageComponent } from "./pages/rxjs-page/basic/smart-search-page/smart-search-page.component";
import { LoadManagerPageComponent } from "./pages/rxjs-page/advanced/load-manager-page/load-manager-page.component";
import { AutosavePageComponent } from "./pages/rxjs-page/training/autosave-page/autosave-page.component";
import { HoldButtonPageComponent } from "./pages/rxjs-page/training/hold-button-page/hold-button-page.component";
import { RetryFetchPageComponent } from "./pages/rxjs-page/training/retry-fetch-page/retry-fetch-page.component";

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
    },
    {
        path: 'training',
        children: [
            { path: '', redirectTo: 'autosave', pathMatch: 'full' },
            { path: 'autosave', component: AutosavePageComponent },
            { path: 'hold-button', component: HoldButtonPageComponent },
            { path: 'retry-fetch', component: RetryFetchPageComponent }
        ]
    }
]