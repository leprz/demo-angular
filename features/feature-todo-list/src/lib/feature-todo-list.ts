import { TodoListSelectors } from './+store/todo-list.selectors';
import { Store } from '@ngrx/store';
import { TodoListState } from './+store/todo-list.reducer';
import { todoListActions } from './+store/todo-list.actions';
import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { FeatureTodoListPort, todoCommonActions } from '@demo/features/feature-todo-common';
import { Observable, tap } from 'rxjs';
import { HttpRequestState } from 'ngx-http-request-state';
import { ReadManyTodosResult } from '@demo/contracts/contract-todo';

@Injectable()
export class FeatureTodoList implements FeatureTodoListPort{
  todoList$: Observable<HttpRequestState<ReadManyTodosResult>> = this.store.select(TodoListSelectors.todoList);

  loadTodoList(): void {
    this.store.dispatch(todoListActions.opened());
  }

  events$ = this.actions$.pipe(
    ofType(
      todoCommonActions.todoDeletedWithSuccess,
      todoCommonActions.todoResolutionUpdatedWithSuccess,
      todoCommonActions.todoCreatedWithSuccess,
    ),
    tap(() => {
      this.store.dispatch(todoListActions.silentReloadRequested())
    }),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<TodoListState>) {
  }
}
