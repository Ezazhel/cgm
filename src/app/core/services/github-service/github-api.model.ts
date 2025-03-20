import { Observable } from 'rxjs';
import { GetReposRequest } from './github-request.model';
import { forwardRef, Injectable } from '@angular/core';
import { GithubService } from './github.service';
import { Repository } from '../../../repositories/model/repository.model';
import { Commit } from '../../../commits/model/commit.model';

@Injectable({
  providedIn: 'root',
  useClass: forwardRef(() => GithubService),
})
export abstract class GithubApi {
  abstract getRepos(filters?: GetReposRequest): Observable<Repository[]>;
  abstract searchCommits(
    repo: string,
    searchParams: string,
  ): Observable<Commit[]>;

  abstract checkRepoExist(repository: string): Observable<boolean>;

  abstract getReposFromIssueTitle(issueTitle: string): Observable<Repository[]>;
}
