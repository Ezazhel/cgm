import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GetReposRequest } from '../../../core/services/github-service/github-request.model';
import { switchMap, tap } from 'rxjs';
import { RepositoryComponent } from './repository/repository.component';
import { GithubApi } from '../../../core/services/github-service/github-api.model';

@Component({
  imports: [CommonModule, RepositoryComponent],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoriesComponent {
  private readonly router = inject(ActivatedRoute);
  private readonly github = inject(GithubApi);

  public hasSearch = signal(false);
  public repositories$ = this.router.queryParams.pipe(
    switchMap((params) => this.github.getRepos(params as GetReposRequest)),
    tap(() => {
      this.hasSearch.set(true);
    }),
  );
}
