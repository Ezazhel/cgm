import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-commits-list',
  imports: [],
  template: `<p>commits-list works!</p>`,
  styleUrl: './commits-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitsListComponent { }
