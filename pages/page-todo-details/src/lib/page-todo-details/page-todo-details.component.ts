import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './page-todo-details.component.html',
  styleUrls: ['./page-todo-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTodoDetailsComponent {
}
