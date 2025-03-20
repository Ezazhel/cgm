import { Injectable } from '@angular/core';
import { Octokit } from '@octokit/core';
import {
  catchError,
  defaultIfEmpty,
  map,
  mergeAll,
  Observable,
  of,
  switchAll,
  switchMap,
  zip,
} from 'rxjs';
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

  /**
   * This method is heavy because github doesn't have a method to retrieve a repository based on its issues title.
   * @param issueTitle the issue title
   * @returns a list of repository containing the issue
   */
  getReposFromIssueTitle(issueTitle: string): Observable<Repository[]> {
    //first retrieve all issues containing issueTitle
    return fromPromise(
      this.octokit
        .request('GET /search/issues', {
          q: `${issueTitle} in:title type:issue`,
        })
        .then((data) => data.data.items)
        .then((issues) => {
          //we might have duplicate issue with same title in a repo
          const uniqueRepoUrl = new Set<string>();
          issues.forEach((issue) => uniqueRepoUrl.add(issue.repository_url));
          return uniqueRepoUrl;
        }),
    ).pipe(
      map((urls) => {
        //create an observable array
        const observables: Observable<Repository>[] = [];
        for (const url of urls) {
          const [owner, repo] = url
            .replace('https://api.github.com/repos/', '') //in order to retrieve owner/repo, we could use split('/') and get last two indexes too
            .split('/');
          //push an observable to the array
          observables.push(
            fromPromise(
              this.octokit.request('GET /repos/{owner}/{repo}', {
                owner,
                repo,
              }),
            ).pipe(map((data) => data.data)),
          );
        }
        return observables;
      }),
      switchMap((obs) => zip(obs)), //zip all observable to reduce the Array
      defaultIfEmpty([]),
    );
  }

  getRepos(filters?: GetReposRequest): Observable<Repository[]> {
    const filterName = filters?.name && `${filters.name} in:name`;
    const filterStar = filters?.stars && `stars:>=${filters?.stars}`;
    const filterLanguage = filters?.language && `language:${filters.language}`;
    const query = [filterName, filterStar, filterLanguage].join(' ').trim();

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
