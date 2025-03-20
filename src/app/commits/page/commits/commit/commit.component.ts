import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Commit } from '../../../model/commit.model';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitComponent {
  public commit = input.required<Commit>();
}
