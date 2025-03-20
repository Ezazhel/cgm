import { Routes } from '@angular/router';
import { RepositoriesComponent } from './page/repositories/repositories.component';
import { RepositoriesFiltersComponent } from './page/repositories/repositories-filters/repositories-filters.component';

export default [
  { path: '', component: RepositoriesComponent },
  { path: '', component: RepositoriesFiltersComponent, outlet: 'filter' },
  { path: '**', redirectTo: '' },
] satisfies Routes;
