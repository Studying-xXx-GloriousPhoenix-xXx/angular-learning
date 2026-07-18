import { Component } from '@angular/core';
import { CropTextPipe } from '../../common-ui/pipes/crop-text.pipe';
import { DemoCardComponent } from "../../common-ui/components/demo-card/demo-card.component";
import { PhoneFormatterPipe } from "../../common-ui/pipes/phone-formatter.pipe";
import { TimeAgoPipe } from "../../common-ui/pipes/time-ago.pipe";
import { SafeHtmlPipe } from "../../common-ui/pipes/safe-html.pipe";
import { interval, map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-pipe-page',
    imports: [DemoCardComponent, CropTextPipe, PhoneFormatterPipe, TimeAgoPipe, SafeHtmlPipe, AsyncPipe],
    templateUrl: './pipe-page.component.html',
    styleUrl: './pipe-page.component.scss',
})
export class PipePageComponent {
    protected readonly date: Date = new Date();
    protected readonly text = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui laboriosam inventore placeat veritatis deleniti maxime saepe doloremque aliquam velit, repellendus quaerat, labore optio reprehenderit, totam neque nostrum dolores culpa ab?";
    protected readonly phone = "+380661234567";
    protected readonly code = `
        <div style="display: flex; flex-flow: column nowrap; width: 100%; padding: 15px; border-radius: 8px; background-color: #f0f4f8; border-left: 5px solid #007bff;">
            <h4 style="color: #007bff; margin-top: 0;">🔓 HTML Security Bypassed!</h4>
            <p>This block was passed as a <strong>string</strong> but successfully rendered as live HTML.</p>
            <button 
                style="padding: 6px 12px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;"
                onclick="alert('The pipe is working perfectly!')">
                Click me
            </button>
        </div>
    `;
    
    protected currentTime$ = interval(1000).pipe(
        startWith(0),
        map(() => Date.now())
    );
}
