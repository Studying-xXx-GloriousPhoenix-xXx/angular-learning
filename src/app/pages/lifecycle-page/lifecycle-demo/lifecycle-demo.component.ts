import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, inject, input, OnChanges, OnDestroy, OnInit, signal, SimpleChanges } from '@angular/core';
import { LifecycleLogService } from '../../../data/services/lifecycle-log.service';

@Component({
    selector: 'app-lifecycle-demo',
    imports: [],
    templateUrl: './lifecycle-demo.component.html',
    styleUrl: './lifecycle-demo.component.scss',
})
export class LifecycleDemoComponent
    implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked,
    OnDestroy
{
    private logService = inject(LifecycleLogService);

    title = signal<string>('Якийсь заголовок');
    name = input.required<string>();
    obj = input.required<any>();
    text = input<string>('Якийсь текст');

    constructor() {
        console.log(
            '%c Компонент LifecycleDemo успішно створено! ',
            'background: darkgreen',
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.logService.logNgOnChanges('Дочірній', undefined, 'aqua');
    }
    ngOnInit(): void {
        this.logService.logNgOnInit('Дочірній', undefined, 'deepskyblue');
    }
    ngDoCheck(): void {
        this.logService.logNgDoCheck('Дочірній', undefined, 'pink');
    }
    ngAfterContentInit(): void {
        this.logService.logNgAfterContentInit('Дочірній', undefined, 'lightgreen');
    }
    ngAfterContentChecked(): void {
        this.logService.logNgAfterContentChecked('Дочірній', undefined, 'green');
    }
    ngAfterViewInit(): void {
        this.logService.logNgAfterViewInit('Дочірній', undefined, 'yellow');
        this.title.set('123');
    }
    ngAfterViewChecked(): void {
        this.logService.logNgAfterViewChecked('Дочірній', undefined, 'orange');
    }
    ngOnDestroy(): void {
        this.logService.logNgOnDestroy('Дочірній', undefined, 'red');
    }
}