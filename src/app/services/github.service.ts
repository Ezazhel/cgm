import { Injectable } from '@angular/core';
import { Octokit } from '@octokit/core';
import { catchError, map, of } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { environment } from '../../environments/environment';
import { GetReposRequest } from './github-request.model';

/**
 * This service allow the user to search data via github api
 * we use Octokit an official lib for github api removing a lot of implementation
 */
@Injectable({ providedIn: 'root' })
export class GithubService {
  private octokit = new Octokit({
    auth: environment.GITHUB_TOKEN,
  });

  getRepos(filters?: GetReposRequest) {
    const filterName = filters?.name && `${filters.name} in:name`;
    const filterStar = filters?.stars && `stars:>=${filters?.stars}`;
    const filterLanguage = filters?.language && `language:${filters.language}`;
    const filterIssues =
      filters?.issueTitle && `${filters.issueTitle} in:issues-title`;
    const query = [filterName, filterStar, filterLanguage, filterIssues]
      .join(' ')
      .trim();
    if (!query) return of({ items: [] });

    return fromPromise(
      this.octokit.request('GET /search/repositories', {
        q: query,
      }),
    ).pipe(
      map((result) => result.data),
      catchError(() => of()),
    );
  }

  searchCommits(repo: string, searchParams: string) {
    if (!searchParams) return of();
    const query = `${searchParams}+repo:${repo}`;
    return fromPromise(
      this.octokit.request('GET /search/commits', {
        q: query,
      }),
    ).pipe(map((result) => result.data.items));
  }

  checkRepoExist(repository: string) {
    const [owner, repo, ...rest] = repository.split('/');
    return fromPromise(
      this.octokit.request('GET /repos/{owner}/{repo}', {
        owner,
        repo,
      }),
    ).pipe(catchError(() => of(false)));
  }
}
