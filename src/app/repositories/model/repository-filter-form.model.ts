import { FormControl } from '@angular/forms';

export interface RepositoriesFiltersForm {
  name: FormControl<string | null>;
  language: FormControl<string | null>;
  stars: FormControl<string | number | null>;
}

export interface IssuesFiltersForm {
  issueTitle: FormControl<string | null>;
}
