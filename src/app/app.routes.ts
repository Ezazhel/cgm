import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'repos', pathMatch: 'full' },
  {
    path: 'repos',
    loadChildren: () => import('./repositories/repositories.routing'),
  },
  { path: 'commits', loadChildren: () => import('./commits/commits.routing') },
  { path: '**', redirectTo: 'repos' },
];
