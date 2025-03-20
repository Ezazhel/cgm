import {
  ChangeDetectionStrategy,
  Component,
  inject,
  output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-repos-list-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './repos-list-filters.component.html',
  styleUrl: './repos-list-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReposListFiltersComponent {
  public filterGroup = new FormGroup({
    name: new FormControl<string>(''),
    text: new FormControl<string>(''),
    language: new FormControl<string>(''),
    stars: new FormControl<number>(0),
  });

  private readonly router = inject(Router);

  filter() {
    let queryParams: any = {};
    Object.entries(this.filterGroup.value).forEach(([nextKey, nextValue]) => {
      if (nextValue) {
        queryParams[nextKey] = nextValue;
      }
    });
    this.router.navigate([], { queryParams });
  }
}
