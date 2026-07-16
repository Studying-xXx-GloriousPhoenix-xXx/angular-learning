import { Component, computed, input } from '@angular/core';

@Component({
    selector: 'app-svg',
    standalone: true,
    template: `
      <svg 
        [attr.width]="size()" 
        [attr.height]="size()" 
        [attr.viewBox]="viewBox()" 
        [class]="className()"
      >
        <use [attr.href]="svgPath()" width="100%" height="100%"></use>
      </svg>
    `,
    styles: [`
      :host {
        display: inline-block;
        line-height: 0;
      }
    `]
  })
export class SvgComponent {
    name = input.required<string>();
    size = input<string | number>('24');
    className = input<string>('');
    
    viewBox = input<string>('0 0 24 24'); 
  
    protected svgPath = computed(() => `assets/svgs/${this.name()}.svg#${this.name()}`);
  }
