import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { CommitsComponent } from './commits.component';
import { RouterTestingHarness } from '@angular/router/testing';
import { GithubApi } from '../../../core/services/github-service/github-api.model';
import { provideLocationMocks } from '@angular/common/testing';
import { MockGitHub } from '../../../core/spec-helper/mockup-github.service';

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
        { provide: GithubApi, useClass: MockGitHub },
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
