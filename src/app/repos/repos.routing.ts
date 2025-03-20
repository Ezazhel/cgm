import { Routes } from "@angular/router";
import { ReposListComponent } from "./page/repos-list/repos-list.component";

export default [
  { path: '', component: ReposListComponent },
  { path: '**', redirectTo: '' }
] satisfies Routes
