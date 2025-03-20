import { Routes } from '@angular/router';
import { RepositoriesComponent } from './page/repositories/repositories.component';
import { RepositoriesFiltersComponent } from './page/repositories/repositories-filters/repositories-filters.component';

/*
  We use another outlet to display the filter, is it necessary ?
  Probably not but that way Repositories and RepositoriesFilter doesn't have parent/child relation.
*/
export default [
  { path: '', component: RepositoriesComponent },
  { path: '', component: RepositoriesFiltersComponent, outlet: 'filter' },
  { path: '**', redirectTo: '' },
] satisfies Routes;
