import { Store } from '@ngrx/store';
import { todoDetailsActions, TodoDetailsSelectors, TodoDetailsState } from './+state/todo-details.store';
import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { FeatureTodoDetailsPort, todoCommonActions } from '@demo/features/feature-todo-common';
import { Observable, tap } from 'rxjs';
import { HttpRequestState } from 'ngx-http-request-state';
import { ReadOneTodoPathParams, ReadOneTodoResult } from '@demo/contracts/contract-todo';

@Injectable()
export class FeatureTodoDetails implements FeatureTodoDetailsPort {
  readonly events$ = (id: string) => this.actions$.pipe(
    ofType(
      todoCommonActions.todoResolutionUpdatedWithSuccess,
      todoCommonActions.todoUpdatedWithSuccess
    ),
    tap(() => {
      this.reload({ id });
    })
  );

  todoDetails$: Observable<HttpRequestState<ReadOneTodoResult>> = this.store.select(TodoDetailsSelectors.todo);

  loadTodo(data: ReadOneTodoPathParams): void {
    this.store.dispatch(todoDetailsActions.opened({ payload: data }));
  }

  reload(data: ReadOneTodoPathParams): void {
    this.store.dispatch(todoDetailsActions.reloaded({  payload: data }));
  }

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<TodoDetailsState>) {
  }
}
