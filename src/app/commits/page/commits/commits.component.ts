import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { CommitComponent } from './commit/commit.component';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { GithubApi } from '../../../core/services/github-service/github-api.model';

@Component({
  templateUrl: './commits.component.html',
  styleUrl: './commits.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommitComponent, AsyncPipe],
})
export class CommitsComponent {
  public readonly repo = input.required<string>();
  private readonly github = inject(GithubApi);
  private readonly activatedRoute = inject(ActivatedRoute);
  public hasSearch = signal<boolean>(false); //used to display default message when user has not search, could be improve via directive

  public readonly commits$ = this.activatedRoute.queryParams.pipe(
    switchMap((params) => this.github.searchCommits(this.repo(), params['q'])),
    tap(() => this.hasSearch.set(true)),
  );
}
