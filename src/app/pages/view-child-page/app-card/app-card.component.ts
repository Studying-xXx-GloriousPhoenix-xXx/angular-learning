import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div class="card" [class.highlighted]="isHighlighted()">
      <h4>{{ title() }}</h4>
      <p>{{ description() }}</p>
    </div>
  `,
  styles: `
    .card {
      padding: 20px;
      border: 2px solid var(--color-text);
      border-radius: 12px;
      background: #ffffff;
      transition: all 250ms ease;
      
      h4 { margin: 0 0 8px 0; color: var(--color-primary); }
      
      &.highlighted {
        border-color: var(--color-accent);
        box-shadow: 0 0 12px rgba(236, 72, 153, 0.3);
        transform: translateY(-2px);
      }
    }
  `
})
export class AppCardComponent {
  title = input.required<string>();
  description = input<string>('Опис стандартної картки');
  
  isHighlighted = signal<boolean>(false);

  toggleHighlight() {
    this.isHighlighted.update(v => !v);
  }
}