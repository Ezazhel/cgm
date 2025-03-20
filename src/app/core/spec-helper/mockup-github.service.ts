import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GithubApi } from '../services/github-service/github-api.model';
import { GetReposRequest } from '../services/github-service/github-request.model';
import { Repository } from '../../repositories/model/repository.model';

@Injectable()
export class MockGitHub implements GithubApi {
  getReposFromIssueTitle(issueTitle: string): Observable<Repository[]> {
    return of([]);
  }
  getRepos(filters: GetReposRequest): Observable<any> {
    return Object.keys(filters).length ? of([]) : of();
  }
  searchCommits(repo: string, searchParams: string): Observable<any> {
    if (!searchParams) return of();
    return of([]);
  }
  checkRepoExist(repository: string): Observable<boolean> {
    if (repository === 'redirect') return of(false);
    return of(true);
  }
}
