import { inject } from '@angular/core';
import { GithubService } from '../../services/github.service';
import { ActivatedRouteSnapshot, Router, RouterState } from '@angular/router';
import { map, of, switchMap, tap } from 'rxjs';

export const commitExist = (
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
