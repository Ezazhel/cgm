import { GitHubUser } from '../../core/model/github-user.model';

export interface Repository {
  full_name: string;
  owner: GitHubUser | null;
  created_at: string;
  name: string;
  open_issues: number;
  id: number;
  language: string | null;
}
