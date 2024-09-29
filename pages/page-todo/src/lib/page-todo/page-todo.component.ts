import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { TodoListContainerComponent } from '@demo/features/feature-todo-list';
import { TodoCreateContainerComponent } from '@demo/features/feature-todo-create';
import { FeatureTodoCreatePort, FeatureTodoListComponent } from '@demo/features/feature-todo-common';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [TodoListContainerComponent, TodoCreateContainerComponent, FeatureTodoListComponent],
  templateUrl: './page-todo.component.html',
  styleUrls: ['./page-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTodoComponent {
  featureTodoCreate = inject(FeatureTodoCreatePort);
  router = inject(Router);
  constructor() {
    // this.featureTodoCreate.todoCreateOneSuccess$.subscribe(async (payload) => {
    //   await this.router.navigate([urlFactory('/todo/:id').url({ id: payload.id })]);
    // });
  }
}
