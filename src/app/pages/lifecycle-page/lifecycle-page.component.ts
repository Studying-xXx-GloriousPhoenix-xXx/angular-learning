import { Component, inject } from '@angular/core';
import { LifecycleDemoComponent } from "./lifecycle-demo/lifecycle-demo.component";
import { LifecycleLogService } from '../../data/services/lifecycle-log.service';

@Component({
    selector: 'app-lifecycle-page',
    imports: [LifecycleDemoComponent],
    templateUrl: './lifecycle-page.component.html',
    styleUrl: './lifecycle-page.component.scss',
})
export class LifecyclePageComponent {
    private logService = inject(LifecycleLogService);

    title: string = 'Заголовок';
    name: string = "Ім'я";
    toggler: boolean = true;
    obj = { age: 12 };

    constructor() {
        setTimeout(() => {
            this.title = 'Інший заголовок';
            this.obj = { ...this.obj, age: 10 };
        }, 3000);
        console.log(
            '%c Компонент LifecyclePage успішно створено! ',
            'background: darkgreen',
        );
    }

    ngOnChanges(): void {
        this.logService.logNgOnChanges('Батьківський', undefined, 'aqua');
    }
    ngOnInit(): void {
        this.logService.logNgOnInit('Батьківський', undefined, 'deepskyblue');
    }
    ngDoCheck(): void {
        this.logService.logNgDoCheck('Батьківський', undefined, 'pink');
    }
    ngAfterContentInit(): void {
        this.logService.logNgAfterContentInit('Батьківський', undefined, 'lightgreen');
    }
    ngAfterContentChecked(): void {
        this.logService.logNgAfterContentChecked('Батьківський', undefined, 'green');
    }
    ngAfterViewInit(): void {
        this.logService.logNgAfterViewInit('Батьківський', undefined, 'yellow');
    }
    ngAfterViewChecked(): void {
        this.logService.logNgAfterViewChecked('Батьківський', undefined, 'orange');
    }
    ngOnDestroy(): void {
        this.logService.logNgOnDestroy('Батьківський', undefined, 'red');
    }
}
