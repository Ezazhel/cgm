import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-repos-list',
  imports: [],
  template: `<p>repos-list works!</p>`,
  styleUrl: './repos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReposListComponent { }
