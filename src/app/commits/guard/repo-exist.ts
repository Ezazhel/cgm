import { inject } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { ActivatedRouteSnapshot, Router, RouterState } from '@angular/router';
import { tap } from 'rxjs';

/**
 * Check if a repo exist when accessing the /commits page.
 * If it doesn't then we navigate back to /repos
 */
export const repoExist = (
  route: ActivatedRouteSnapshot,
  state: RouterState,
) => {
  const router = inject(Router);
  const github = inject(GithubService);
  const { repo } = route.queryParams;
  if (repo == null) return router.navigateByUrl('/repos');

  return github
    .checkRepoExist(repo)
    .pipe(tap((exist) => exist || router.navigateByUrl('/repos')));
};
