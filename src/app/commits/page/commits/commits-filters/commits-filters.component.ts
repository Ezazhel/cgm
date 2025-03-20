import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commits-filters',
  template: `<label>
    Search by content
    <input type="search" (search)="filter($event)" />
  </label> `,
  styles: [':host { display: block}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitsFilterComponent {
  private readonly router = inject(Router);
  filter(event: Event) {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: { q: (event.target as HTMLInputElement).value },
    });
  }
}
