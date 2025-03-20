import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { GithubService } from '../../../services/github.service';
import { ReposListItemComponent } from './repos-list-item/repos-list-item.component';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import {
  debounceTime,
  defer,
  fromEvent,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-repos-list',
  imports: [ReposListItemComponent, CommonModule],
  templateUrl: './repos-list.component.html',
  styleUrl: './repos-list.component.scss',
})
export class ReposListComponent implements AfterViewInit {
  private destroyRef = inject(DestroyRef);
  private readonly inputSearch =
    viewChild.required<ElementRef<HTMLInputElement>>('searchName');
  private readonly github = inject(GithubService);
  public repositories = signal<{ items: [] }>({ items: [] });
  ngAfterViewInit(): void {
    fromEvent(this.inputSearch().nativeElement, 'input')
      .pipe(
        debounceTime(300),
        takeUntilDestroyed(this.destroyRef),
        map((event) => (event.target as HTMLInputElement).value || undefined),
        switchMap((value) => this.github.getRepos({ name: value })),
      )
      .subscribe((value) => this.repositories.set(value));
  }
}
