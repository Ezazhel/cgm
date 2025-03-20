import { Component, inject } from '@angular/core';
import { GithubService } from '../../../services/github.service';
import { ReposListItemComponent } from './repos-list-item/repos-list-item.component';
import { CommonModule } from '@angular/common';
import { ReposListFiltersComponent } from './repos-list-filters/repos-list-filters.component';
import { ActivatedRoute } from '@angular/router';
import { GetReposRequest } from '../../../services/github-request.model';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-repos-list',
  imports: [ReposListItemComponent, CommonModule, ReposListFiltersComponent],
  templateUrl: './repos-list.component.html',
  styleUrl: './repos-list.component.scss',
})
export class ReposListComponent {
  private readonly router = inject(ActivatedRoute);
  private readonly github = inject(GithubService);
  public repositories$ = this.router.queryParams.pipe(
    switchMap((params) => this.github.getRepos(params as GetReposRequest)),
  );
}
