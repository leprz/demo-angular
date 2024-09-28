import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TodoListContainerComponent } from '@demo/features/feature-todo-list';
import { TodoCreateComponent } from '@demo/features/feature-todo-create';
import { FeatureTodoListComponent } from '@demo/features/feature-todo-common';

@Component({
  standalone: true,
  imports: [TodoListContainerComponent, TodoCreateComponent, FeatureTodoListComponent],
  templateUrl: './page-todo.component.html',
  styleUrls: ['./page-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTodoComponent {
}
