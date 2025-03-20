import { GitHubUser } from '../../core/model/github-user.model';

export interface Commit {
  author: GitHubUser | null;
  url: string;
  commit: {
    message: string;
  };
}
