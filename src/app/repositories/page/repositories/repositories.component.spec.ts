import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { RepositoriesComponent } from './repositories.component';
import { provideLocationMocks } from '@angular/common/testing';
import { GithubApi } from '../../../core/services/github-service/github-api.model';
import { GetReposRequest } from '../../../core/services/github-service/github-request.model';
import { MockGitHub } from '../../../core/spec-helper/mockup-github.service';

describe('RepositoriesComponent', () => {
  const setup = async (params?: GetReposRequest) => {
    TestBed.configureTestingModule({
      imports: [RepositoriesComponent],
      providers: [
        provideRouter([{ path: 'repos', component: RepositoriesComponent }]),
        provideLocationMocks(),
        {
          provide: GithubApi,
          useClass: MockGitHub,
        },
      ],
    }).compileComponents();
    const githubApi = TestBed.inject(GithubApi);
    spyOn(githubApi, 'getRepos').and.callThrough();
    spyOn(githubApi, 'getReposFromIssueTitle').and.callThrough();
    let path: string = 'repos?';
    params &&
      Object.entries(params).forEach(([key, value]) => {
        if (value != null) {
          path = path.concat(`${key}=${value}&`);
        }
      });
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl(
      `${path}`,
      RepositoriesComponent,
    );
    harness.fixture.detectChanges();
    return { component, githubApi };
  };
  it('should get repos when there is no queryParams', async () => {
    const { githubApi, component } = await setup();
    expect(githubApi.getRepos).toHaveBeenCalledWith({});
    expect(component.hasSearch()).toBeFalse();
  });

  it('should pass param to getRepos when there is no issueTitle atleast one queryParams', async () => {
    const { githubApi, component } = await setup({
      name: 'jquery',
      language: 'language',
      stars: '5',
    });
    expect(component.hasSearch()).toBeTrue();
    expect(githubApi.getRepos).toHaveBeenCalledWith({
      name: 'jquery',
      language: 'language',
      stars: '5',
    });
  });
  it('should pass param to getReposFromIssue when there is issueTitle in queryParams', async () => {
    const { githubApi, component } = await setup({
      issueTitle: 'jquery',
    });
    expect(component.hasSearch()).toBeTrue();
    expect(githubApi.getReposFromIssueTitle).toHaveBeenCalledWith('jquery');
  });
});
