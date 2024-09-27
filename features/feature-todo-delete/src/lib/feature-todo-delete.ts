import { Store } from '@ngrx/store';
import { todoDeleteActions, TodoDeleteSelectors, TodoDeleteState } from './+store/todo-delete.store';
import { Injectable } from '@angular/core';
import { FeatureTodoDeletePayload, FeatureTodoDeletePort, todoCommonActions } from '@demo/features/feature-todo-common';
import { filter, map } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

@Injectable()
export class FeatureTodoDeleteImpl implements FeatureTodoDeletePort {
  deleteResult$ = (payload: FeatureTodoDeletePayload) =>
    this.store.select(TodoDeleteSelectors.delete(payload.id));

  deleteSuccessCollection$ = this.actions$.pipe(
    ofType(todoCommonActions.todoDeletedWithSuccess),
    map((action) => action.payload),
  );

  deleteOneSuccess$ = (payload: FeatureTodoDeletePayload) =>
    this.deleteSuccessCollection$.pipe(filter((result) => result.id === payload.id));

  delete(payload: FeatureTodoDeletePayload): void {
    this.store.dispatch(todoDeleteActions.triggered({ payload }));
  }

  constructor(
    private readonly store: Store<TodoDeleteState>,
    private readonly actions$: Actions,
  ) {}
}
