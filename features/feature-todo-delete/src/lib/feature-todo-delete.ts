import {Store} from '@ngrx/store';
import {todoDeleteActions, TodoDeleteSelectors, TodoDeleteState,} from './+store/todo-delete.store';
import {Injectable} from '@angular/core';
import {
  todoCommonActions,
  FeatureTodoDelete,
  FeatureTodoDeletePayload,
} from '@demo/features/feature-todo-common';
import {filter, map} from 'rxjs';
import {Actions, ofType} from '@ngrx/effects';

@Injectable()
export class FeatureTodoDeleteImpl implements FeatureTodoDelete {
  deleteResult$ = (payload: FeatureTodoDeletePayload) => this.store.select(TodoDeleteSelectors.delete(payload.id));

  delete(payload: FeatureTodoDeletePayload): void {
    this.store.dispatch(
      todoDeleteActions.triggered({ payload  })
    );
  }

  deleteSuccess$ = this.actions$.pipe(
    ofType(todoCommonActions.todoDeletedWithSuccess),
    map((action) => action.payload)
  );

  deleteOneSuccess$ = (payload: FeatureTodoDeletePayload) =>
    this.deleteSuccess$.pipe(
      filter((result) => result.id === payload.id)
    );

  constructor(
    private readonly store: Store<TodoDeleteState>,
    private readonly actions$: Actions
  ) {}
}
