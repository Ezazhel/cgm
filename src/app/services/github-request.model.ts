/**
 * This should follow repositories-filters
 * Its used by github service to fetch repos, each property is a filter
 */
export interface GetReposRequest {
  name?: string;
  stars?: string;
  language?: string;
  issueTitle?: string;
}
