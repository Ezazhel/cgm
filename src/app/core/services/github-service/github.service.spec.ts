import { GithubService } from './github.service';

describe('Github service', () => {
  it('should get repositories with filter', () => {
    const service = new GithubService();
    const request = spyOn(service['octokit'], 'request');
    service
      .getRepos({
        name: 'name',
        issueTitle: 'title',
        language: 'javascript',
        stars: '5',
      })
      .subscribe();
    expect(request).toHaveBeenCalledOnceWith('GET /search/repositories', {
      q: 'name in:name stars:>=5 language:javascript title in:issues-title',
    });
  });

  it('should check if repositories exist', () => {
    const service = new GithubService();
    const request = spyOn(service['octokit'], 'request');
    service.checkRepoExist('owner/repo').subscribe();
    expect(request).toHaveBeenCalledWith('GET /repos/{owner}/{repo}', {
      owner: 'owner',
      repo: 'repo',
    });
  });

  it('should get commits of a repos', () => {
    const service = new GithubService();
    const request = spyOn(service['octokit'], 'request');
    service.searchCommits('owner/repo', 'search').subscribe();
    expect(request).toHaveBeenCalledWith('GET /search/commits', {
      q: 'search+repo:owner/repo',
    });
  });
});
