import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
} from '@angular/core';
import { GithubService } from '../../../services/github.service';
import { CommitComponent } from './commit/commit.component';
import { ActivatedRoute } from '@angular/router';
import {
  defer,
  filter,
  Observable,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  templateUrl: './commits.component.html',
  styleUrl: './commits.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommitComponent, AsyncPipe],
})
export class CommitsComponent {
  public readonly repo = input.required<string>();
  private readonly github = inject(GithubService);
  private readonly activatedRoute = inject(ActivatedRoute);
  public search = signal<boolean>(false);
  public readonly commits$ = this.activatedRoute.queryParams.pipe(
    switchMap((params) => this.github.searchCommits(this.repo(), params['q'])),
  );
}
