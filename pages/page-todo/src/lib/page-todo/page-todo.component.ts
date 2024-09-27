import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TodoListComponent } from '@demo/features/feature-todo-list';
import { TodoCreateComponent } from '@demo/features/feature-todo-create';
import { FeatureTodoDeletePolicyProviderComponent } from '@demo/features/feature-todo-common';

@Component({
  standalone: true,
  imports: [TodoListComponent, TodoCreateComponent, FeatureTodoDeletePolicyProviderComponent],
  templateUrl: './page-todo.component.html',
  styleUrls: ['./page-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTodoComponent {
}
