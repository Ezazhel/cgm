import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterState } from '@angular/router';
import { Observable, of, switchMap, tap } from 'rxjs';
import { GithubApi } from '../../core/services/github-service/github-api.model';

/**
 * Check if a repo exist when accessing the /commits page.
 * If it doesn't then we navigate back to /repos
 */
export const repoExist = (
  route: ActivatedRouteSnapshot,
): Observable<boolean> => {
  const router = inject(Router);
  const github = inject(GithubApi);
  const { repo } = route.queryParams;
  if (repo == null) {
    router.navigateByUrl('/repos');
    return of(false);
  }
  return github
    .checkRepoExist(repo)
    .pipe(tap((exist) => exist || router.navigateByUrl('/repos')));
};
