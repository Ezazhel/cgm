import { Routes } from '@angular/router';
import { CommitsComponent } from './page/commits/commits.component';
import { CommitsFilterComponent } from './page/commits/commits-filters/commits-filters.component';
import { repoExist } from './guard/repo-exist.guard';

/*
  We use another outlet to display the filter, is it necessary ?
  Probably not but that way Commits and CommitsFilter doesn't have parent/child relation.
*/
export default [
  { path: '', component: CommitsComponent, canActivate: [repoExist] },
  { path: '', component: CommitsFilterComponent, outlet: 'filter' },
] satisfies Routes;
