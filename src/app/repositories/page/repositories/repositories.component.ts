import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { GithubService } from '../../../services/github.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GetReposRequest } from '../../../services/github-request.model';
import { finalize, switchMap } from 'rxjs';
import { RepositoryComponent } from './repository/repository.component';

@Component({
  imports: [CommonModule, RepositoryComponent],
  templateUrl: './repositories.component.html',
  styleUrl: './repositories.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoriesComponent {
  private readonly router = inject(ActivatedRoute);
  private readonly github = inject(GithubService);

  public hasSearch = signal(false);
  public repositories$ = this.router.queryParams.pipe(
    switchMap((params) => this.github.getRepos(params as GetReposRequest)),
    finalize(() => this.hasSearch.set(true)),
  );
}
