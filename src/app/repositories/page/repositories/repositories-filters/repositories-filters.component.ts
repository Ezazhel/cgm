import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-repositories-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './repositories-filters.component.html',
  styleUrl: './repositories-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoriesFiltersComponent {
  public filterGroup = new FormGroup({
    name: new FormControl<string>(''),
    text: new FormControl<string>(''),
    language: new FormControl<string>(''),
    stars: new FormControl<number>(0),
  });

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.queryParams
      .pipe(
        takeUntilDestroyed(),
        filter((params) => Object.keys(params).length > 0),
      )
      .subscribe((params) => {
        this.filterGroup.patchValue(params);
      });
  }
  filter() {
    let queryParams: any = {};
    Object.entries(this.filterGroup.value).forEach(([nextKey, nextValue]) => {
      if (nextValue) {
        queryParams[nextKey] = nextValue;
      }
    });
    this.router.navigate([], { queryParams });
  }
}
