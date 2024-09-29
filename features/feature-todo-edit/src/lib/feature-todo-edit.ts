import { Injectable } from '@angular/core';
import { todoEditActions, TodoEditSelectors, TodoEditState } from './+store/todo-edit.store';
import { Store } from '@ngrx/store';
import { UpdateOneTodoBodyParams, UpdateOneTodoPathParams, UpdateOneTodoResult } from '@demo/contracts/contract-todo';
import { Actions, ofType } from '@ngrx/effects';
import { FeatureTodoEditPort, todoCommonActions } from '@demo/features/feature-todo-common';
import { Observable } from 'rxjs';
import { HttpRequestState } from 'ngx-http-request-state';

@Injectable()
export class FeatureTodoEdit implements FeatureTodoEditPort{
  constructor(
    private readonly store: Store<TodoEditState>,
    private readonly actions$: Actions
  ) {
  }

  todoUpdateOneSuccess$: Observable<UpdateOneTodoPathParams & UpdateOneTodoBodyParams> = this.actions$.pipe(
    ofType(todoCommonActions.todoUpdatedWithSuccess),
  );

  todoUpdateResult$: (payload: UpdateOneTodoPathParams) => Observable<HttpRequestState<UpdateOneTodoResult>>
    = (payload) => this.store.select(TodoEditSelectors.edit(payload.id));

  updateTodo(payload: UpdateOneTodoBodyParams & UpdateOneTodoPathParams): void {
    this.store.dispatch(
      todoEditActions.triggered({ payload })
    );
  }
}
