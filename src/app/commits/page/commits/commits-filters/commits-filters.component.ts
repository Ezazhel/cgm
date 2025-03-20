import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * This component only contains an input because we need to filter only on commit message, for now that is.
 */
@Component({
  selector: 'app-commits-filters',
  template: `
    <label>
      Search by content
      <input
        type="search"
        (search)="filter($event)"
        data-testId="searchParams"
      />
    </label>
  `,
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
