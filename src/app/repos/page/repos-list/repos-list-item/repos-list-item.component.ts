import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-repos-list-item',
  imports: [],
  template: `<p>repos-list-item works!</p>`,
  styleUrl: './repos-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReposListItemComponent { }
