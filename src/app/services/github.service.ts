import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Octokit } from '@octokit/core';
import { catchError, map, Observable, of } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { environment } from '../../environments/environment';
import { GetReposRequest } from './github-request.model';

@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly httpClient = inject(HttpClient);
  private octokit = new Octokit({
    auth: environment.GITHUB_TOKEN,
  });

  getRepos(filters?: GetReposRequest): Observable<any> {
    const query = `${filters?.name} in:name`;
    // stars:>=n
    // language:LANGUAGE

    return fromPromise(
      this.octokit.request('GET /search/repositories', { q: query }),
    ).pipe(
      map((result) => result.data),
      catchError(() => of()),
    );
  }
}
