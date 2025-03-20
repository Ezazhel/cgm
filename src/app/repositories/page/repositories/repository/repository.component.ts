import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Repository } from '../../../model/repository.model';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-repository',
  imports: [DatePipe, RouterLink],
  templateUrl: './repository.component.html',
  styleUrl: './repository.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryComponent {
  public readonly repository = input.required<Repository>();
}
