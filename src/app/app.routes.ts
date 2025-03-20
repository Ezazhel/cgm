import { Routes } from '@angular/router';
import { ReposListComponent } from './repos/page/repos-list/repos-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'repos', pathMatch: 'full' }
  { path: 'repos', loadChildren: () => ReposListComponent },
  { path: 'commits' },
  { path: '**', redirectTo: 'repos' }
];
