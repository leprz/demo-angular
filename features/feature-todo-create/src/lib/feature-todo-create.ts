import {todoCreateActions, TodoCreateSelectors, TodoCreateState,} from './+store/todo-create.store';
import {Store} from '@ngrx/store';
import {CreateOneTodoContract,} from '@demo/contracts/contract-todo';
import {Injectable} from '@angular/core';
import { FeatureTodoCreatePort, todoCommonActions } from '@demo/features/feature-todo-common';
import { Actions, ofType } from '@ngrx/effects';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FeatureTodoCreate implements FeatureTodoCreatePort {
  todoCreateResult$ = this.store.select(TodoCreateSelectors.createTodoForm);

  todoCreateOneSuccess$ = this.actions$.pipe(
    ofType(todoCommonActions.todoCreatedWithSuccess),
    map((action) => action.payload),
  );

  createTodo(payload: typeof CreateOneTodoContract.bodyParams): void {
    this.store.dispatch(
      todoCreateActions.createTodoSubmitted({
        payload,
      })
    );
  }

  constructor(
    private readonly store: Store<TodoCreateState>,
    private readonly actions$: Actions,
  ) {}
}
