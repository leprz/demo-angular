import {ChangeDetectionStrategy, Component} from '@angular/core';

import {TodoListComponent} from "@demo/features/feature-todo-list";
import {TodoCreateComponent} from "@demo/features/feature-todo-create";

@Component({
  standalone: true,
  imports: [TodoListComponent, TodoCreateComponent],
  templateUrl: './page-todo.component.html',
  styleUrls: ['./page-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTodoComponent {
}
