import { createActionGroup, createFeature, createReducer, on, props } from '@ngrx/store';
import { ActionPayload, HttpRequestsStateIdle } from '@demo/utils/utils-data-service';
import { HttpErrorResponse } from '@angular/common/http';
import { CreateOneTodoContract, TodoDataServicePort } from '@demo/contracts/contract-todo';
import { errorState, HttpRequestState, loadedState, loadingState } from 'ngx-http-request-state';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { fetch } from '@ngrx/router-store/data-persistence';
import { todoCommonActions } from '@demo/features/feature-todo-common';

export const todoCreateActions = createActionGroup({
  source: 'todo form',
  events: {
    'create todo submitted':
      props<ActionPayload<typeof CreateOneTodoContract.bodyParams>>(),
    'create todo form error': props<ActionPayload<HttpErrorResponse>>(),
  },
});

export const TODO_FORM_FEATURE_KEY = 'todoForm';

export interface TodoCreateState {
  createTodoForm: HttpRequestState<void>;
}

const initialState: TodoCreateState = {
  createTodoForm: HttpRequestsStateIdle,
};

export const todoCreateReducer = createReducer(
  initialState,
  on(todoCreateActions.createTodoSubmitted, (state) => ({
    ...state,
    createTodoForm: loadingState(),
  })),
  on(todoCommonActions.todoCreatedWithSuccess, (state) => ({
    ...state,
    createTodoForm: loadedState(undefined),
  })),
  on(todoCreateActions.createTodoFormError, (state, { payload }) => ({
    ...state,
    createTodoForm: errorState(payload),
  })),
);

export const todoCreateFeature = createFeature({
  name: TODO_FORM_FEATURE_KEY,
  reducer: todoCreateReducer,
});

export class TodoCreateSelectors {
  static createTodoForm = (state: TodoCreateState) => (state.createTodoForm);
}

@Injectable({
  providedIn: 'root',
})
export class TodoCreateEffects {
  createTodoForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(todoCreateActions.createTodoSubmitted),
      fetch({
        run: ({ payload }) =>
          this.todoDataService
            .createOne(payload)
            .pipe(map(() => todoCommonActions.todoCreatedWithSuccess({
              payload
            }))),
        onError: (action, error) =>
          todoCreateActions.createTodoFormError({ payload: error }),
      })
    )
  );

  constructor(
    private actions$: Actions,
    private todoDataService: TodoDataServicePort
  ) {}
}
