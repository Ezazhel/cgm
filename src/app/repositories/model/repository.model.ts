import { GitHubUser } from '../../core/model/github-user.model';

/**
 * Minimal information needed to display Repository
 */
export interface Repository {
  full_name: string;
  owner: GitHubUser | null;
  created_at: string;
  name: string;
  language: string | null;
}
