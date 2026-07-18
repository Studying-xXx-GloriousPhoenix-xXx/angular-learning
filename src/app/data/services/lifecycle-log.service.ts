import { Service } from '@angular/core';

export type LifecycleRole = 'Батьківський' | 'Дочірній';

const CHILD_INDENT = '    ';

@Service()
export class LifecycleLogService {

    logNgOnChanges(role: LifecycleRole, bgColor?: string, fontColor?: string): void {
        this.logNgEvent(role, 'ngOnChanges', bgColor, fontColor);
    }

    logNgOnInit(role: LifecycleRole, bgColor?: string, fontColor?: string): void {
        this.logNgEvent(role, 'ngOnInit', bgColor, fontColor);
    }

    logNgDoCheck(role: LifecycleRole, bgColor?: string, fontColor?: string): void {
        this.logNgEvent(role, 'ngDoCheck', bgColor, fontColor);
    }

    logNgAfterContentInit(role: LifecycleRole, bgColor?: string, fontColor?: string): void {
        this.logNgEvent(role, 'ngAfterContentInit', bgColor, fontColor);
    }

    logNgAfterContentChecked(role: LifecycleRole, bgColor?: string, fontColor?: string): void {
        this.logNgEvent(role, 'ngAfterContentChecked', bgColor, fontColor);
    }

    logNgAfterViewInit(role: LifecycleRole, bgColor?: string, fontColor?: string): void {
        this.logNgEvent(role, 'ngAfterViewInit', bgColor, fontColor);
    }

    logNgAfterViewChecked(role: LifecycleRole, bgColor?: string, fontColor?: string): void {
        this.logNgEvent(role, 'ngAfterViewChecked', bgColor, fontColor);
    }

    logNgOnDestroy(role: LifecycleRole, bgColor?: string, fontColor?: string): void {
        this.logNgEvent(role, 'ngOnDestroy', bgColor, fontColor);
    }

    logNgEvent(
        role: LifecycleRole,
        eventName: string,
        bgColor?: string,
        fontColor?: string
    ): void {
        const indent = role === 'Дочірній' ? CHILD_INDENT : '';

        const styles: string[] = [];
        if (bgColor) {
            styles.push(`background: ${bgColor}`);
        }
        if (fontColor) {
            styles.push(`color: ${fontColor}`);
        }
        styles.push('padding: 2px 4px', 'border-radius: 3px');

        console.log(`%c ${indent}${role} ${eventName} `, styles.join('; '));
    }
}