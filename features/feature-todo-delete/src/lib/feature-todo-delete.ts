import {Store} from '@ngrx/store';
import {todoDeleteActions, TodoDeleteSelectors, TodoDeleteState,} from './+store/todo-delete.store';
import {Injectable} from '@angular/core';
import {
  featureTodoCommonActions,
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
      todoDeleteActions.todoDeleteTriggered({ payload  })
    );
  }

  deleteSuccess$ = (payload: FeatureTodoDeletePayload) =>
    this.actions$.pipe(
      ofType(featureTodoCommonActions.todoDeletedWithSuccess),
      filter((action) => action.payload.id === payload.id),
      map((action) => action.payload)
    );

  constructor(
    private readonly store: Store<TodoDeleteState>,
    private readonly actions$: Actions
  ) {}
}
