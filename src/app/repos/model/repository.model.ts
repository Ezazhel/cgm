export interface Repository {
  full_name: string;
  owner: {
    avatar_url: string;
  };
  created_at: string;
  name: string;
  open_issues: number;
  id: number;
  language: string;
}
