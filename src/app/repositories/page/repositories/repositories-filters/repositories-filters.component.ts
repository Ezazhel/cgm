import { ChangeDetectionStrategy, Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs';
import { RepositoriesFiltersForm } from '../../../model/repository-filter-form.model';

@Component({
  selector: 'app-repositories-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './repositories-filters.component.html',
  styleUrl: './repositories-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoriesFiltersComponent {
  public repositoriesFilterGroup = new FormGroup<RepositoriesFiltersForm>({
    name: new FormControl<string>(''),
    language: new FormControl<string>(''),
    stars: new FormControl<number>(0),
  });

  public issuesFilterGroup = new FormGroup({
    issueTitle: new FormControl<string>(''),
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
        this.repositoriesFilterGroup.patchValue(params);
        this.issuesFilterGroup.patchValue({
          issueTitle: params['issueTitle'],
        });
      });
  }
  filterRepository() {
    let queryParams: any = {};
    Object.entries(this.repositoriesFilterGroup.value).forEach(
      ([nextKey, nextValue]) => {
        if (nextValue) {
          queryParams[nextKey] = nextValue;
        }
      },
    );
    this.issuesFilterGroup.reset();
    this.router.navigate([], { queryParams, queryParamsHandling: 'replace' });
  }

  filterIssues() {
    const queryParams = {
      issueTitle: this.issuesFilterGroup.value.issueTitle,
    };
    this.repositoriesFilterGroup.reset();
    this.router.navigate([], { queryParams, queryParamsHandling: 'replace' });
  }
}
