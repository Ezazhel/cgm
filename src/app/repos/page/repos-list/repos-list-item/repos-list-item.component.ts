import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Repository } from '../../../model/repository.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-repos-list-item',
  imports: [DatePipe],
  templateUrl: './repos-list-item.component.html',
  styleUrl: './repos-list-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReposListItemComponent {
  public readonly repository = input.required<Repository>();
}
