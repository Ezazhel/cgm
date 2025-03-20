import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { CommitsComponent } from './commits.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { GithubApi } from '../../../core/services/github-service/github-api.model';
import { Observable, of } from 'rxjs';
import { GetReposRequest } from '../../../core/services/github-service/github-request.model';
import { Repository } from '../../../repositories/model/repository.model';
import { Commit } from '../../model/commit.model';
import { Injectable } from '@angular/core';
import { provideLocationMocks } from '@angular/common/testing';

@Injectable()
class MockGithub implements GithubApi {
  getRepos(filters?: GetReposRequest): Observable<Repository[]> {
    throw new Error('Method not implemented.');
  }
  searchCommits(repo: string, searchParams?: string): Observable<Commit[]> {
    if (!searchParams) return of();
    return of([]);
  }
  checkRepoExist(repository: string): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}

describe('Commits components', () => {
  let harness: RouterTestingHarness;
  let searchCommitsSpy: jasmine.Spy;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [
        provideLocationMocks(),
        provideRouter(
          [{ path: 'commits', component: CommitsComponent }],
          withComponentInputBinding(),
        ),
        { provide: GithubApi, useClass: MockGithub },
      ],
    });
    searchCommitsSpy = spyOn(
      TestBed.inject(GithubApi),
      'searchCommits',
    ).and.callThrough();
    harness = await RouterTestingHarness.create();
  });
  it('should not get commits when q is not set', async () => {
    const component = await harness.navigateByUrl(
      'commits?repo=test/javascript',
      CommitsComponent,
    );
    harness.detectChanges();
    expect(searchCommitsSpy).toHaveBeenCalled();
    expect(component.hasSearch()).toBeFalse();
  });

  it('should get commits when q is set', async () => {
    const component = await harness.navigateByUrl(
      'commits?repo=test/javascript&q=searchParams',
      CommitsComponent,
    );
    harness.detectChanges();
    expect(component.hasSearch()).toBeTrue();
    expect(searchCommitsSpy).toHaveBeenCalledWith(
      'test/javascript',
      'searchParams',
    );
  });
});
