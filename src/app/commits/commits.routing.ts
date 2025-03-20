import { Routes } from '@angular/router';
import { CommitsComponent } from './page/commits/commits.component';
import { CommitsFilterComponent } from './page/commits/commits-filters/commits-filters.component';
import { commitExist } from './guard/commit-exist';

export default [
  { path: '', component: CommitsComponent, canActivate: [commitExist] },
  { path: '', component: CommitsFilterComponent, outlet: 'filter' },
] satisfies Routes;
