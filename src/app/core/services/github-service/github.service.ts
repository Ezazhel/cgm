import { Injectable } from '@angular/core';
import { Octokit } from '@octokit/core';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { environment } from '../../../../environments/environment';
import { GetReposRequest } from './github-request.model';
import { GithubApi } from './github-api.model';
import { Repository } from '../../../repositories/model/repository.model';
import { Commit } from '../../../commits/model/commit.model';

/**
 * This service allow the user to search data via github api
 * we use Octokit an official lib for github api removing a lot of implementation
 */
@Injectable({ providedIn: 'root' })
export class GithubService implements GithubApi {
  private octokit = new Octokit({
    auth: environment.GITHUB_TOKEN,
  });

  getRepos(filters?: GetReposRequest): Observable<Repository[]> {
    const filterName = filters?.name && `${filters.name} in:name`;
    const filterStar = filters?.stars && `stars:>=${filters?.stars}`;
    const filterLanguage = filters?.language && `language:${filters.language}`;
    const filterIssues =
      filters?.issueTitle && `${filters.issueTitle} in:issues-title`;
    const query = [filterName, filterStar, filterLanguage, filterIssues]
      .join(' ')
      .trim();

    if (!query) return of([]);

    return fromPromise(
      this.octokit.request('GET /search/repositories', {
        q: query,
      }),
    ).pipe(
      map((result) => result.data.items),
      catchError(() => of()),
    );
  }

  searchCommits(repo: string, searchParams: string): Observable<Commit[]> {
    if (!searchParams) return of();
    const query = `${searchParams}+repo:${repo}`;
    return fromPromise(
      this.octokit.request('GET /search/commits', {
        q: query,
      }),
    ).pipe(
      map((result) => result.data.items),
      catchError(() => of()),
    );
  }

  checkRepoExist(repository: string): Observable<boolean> {
    const [owner, repo] = repository.split('/');
    return fromPromise(
      this.octokit.request('GET /repos/{owner}/{repo}', {
        owner,
        repo,
      }),
    ).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false)),
    );
  }
}
