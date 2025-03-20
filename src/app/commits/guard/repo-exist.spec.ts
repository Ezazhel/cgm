import { Component, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { repoExist } from './repo-exist.guard';
import { Observable, of } from 'rxjs';
import { provideLocationMocks } from '@angular/common/testing';
import { GithubApi } from '../../core/services/github-service/github-api.model';
import { GetReposRequest } from '../../core/services/github-service/github-request.model';
import { Repository } from '../../repositories/model/repository.model';
import { Commit } from '../model/commit.model';

@Injectable()
class MockupGithub implements GithubApi {
  getRepos(filters?: GetReposRequest): Observable<Repository[]> {
    throw new Error('Method not implemented.');
  }
  searchCommits(repo: string, searchParams: string): Observable<Commit[]> {
    throw new Error('Method not implemented.');
  }
  checkRepoExist(repository: string): Observable<boolean> {
    if (repository === 'redirect') return of(false);
    return of(true);
  }
}
@Component({})
class TestComponent {}
describe('Repo Exist', () => {
  let harness: RouterTestingHarness;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: 'repos', component: TestComponent },
          {
            path: 'commits',
            component: TestComponent,
            canActivate: [repoExist],
          },
        ]),
        provideLocationMocks(),
        { provide: GithubApi, useClass: MockupGithub },
      ],
    });
    harness = await RouterTestingHarness.create();
  });
  it('should redirect to repos if repo not provided in uri', async () => {
    await harness.navigateByUrl('/commits', TestComponent);
    const router = TestBed.inject(Router);
    expect(router.url).toEqual('/repos');
  });

  it('should redirect to repos if repo doesnt exist', async () => {
    await harness.navigateByUrl('/commits?repo=redirect', TestComponent);
    const router = TestBed.inject(Router);
    expect(router.url).toEqual('/repos');
  });
  it('should redirect to repos if repo exist', async () => {
    await harness.navigateByUrl('/commits?repo=exist', TestComponent);
    const router = TestBed.inject(Router);
    expect(router.url).toEqual('/commits?repo=exist');
  });
});
