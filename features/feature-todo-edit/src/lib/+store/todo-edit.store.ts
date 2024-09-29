import { createActionGroup, createFeatureSelector, createReducer, on, props } from '@ngrx/store';
import { ActionPayload } from '@demo/utils/utils-data-service';
import { HttpErrorResponse } from '@angular/common/http';
import { errorState, HttpRequestState, loadedState, loadingState } from 'ngx-http-request-state';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  TodoDataService,
  UpdateOneTodoBodyParams,
  UpdateOneTodoContract,
  UpdateOneTodoPathParams
} from '@demo/contracts/contract-todo';
import { fetch } from '@ngrx/router-store/data-persistence';
import { map } from 'rxjs';
import { todoCommonActions } from '@demo/features/feature-todo-common';

export const todoEditActions = createActionGroup({
  source: 'todo edit',
  events: {
    'triggered': props<ActionPayload<UpdateOneTodoBodyParams & UpdateOneTodoPathParams>>(),
    'edited with error': props<ActionPayload<{
      params: UpdateOneTodoPathParams,
      error: HttpErrorResponse
    }>>(),
  }
});

export const TODO_EDIT_FEATURE_KEY = 'todoEdit';
export interface TodoEditState {
  editMap: Record<string, HttpRequestState<typeof UpdateOneTodoContract.result>>;
}

const initialState: TodoEditState = {
  editMap: {},
};

export const todoEditReducer = createReducer(
  initialState,
  on(todoEditActions.triggered, (state, { payload }) => ({
    ...state,
    editMap: {
      ...state.editMap,
      [payload.id]: loadingState(),
    }
  })),
  on(todoCommonActions.todoUpdatedWithSuccess, (state, { payload }) => ({
    ...state,
    editMap: {
      ...state.editMap,
      [payload.id]: loadedState(undefined),
    }
  })),
  on(todoEditActions.editedWithError, (state, { payload }) => ({
    ...state,
    editMap: {
      ...state.editMap,
      [payload.params.id]: errorState(payload.error),
    }
  })),
);

const todoEditFeatureSelector = createFeatureSelector<TodoEditState>(TODO_EDIT_FEATURE_KEY);
export const TodoEditSelectors = {
  edit: (id: string) => (state: TodoEditState) => state.editMap[id],
};

@Injectable()
export class TodoEditEffects {
  readonly edit$ = createEffect(() => this.actions$.pipe(
    ofType(todoEditActions.triggered),
    fetch({
      run: (action) => this.todoDataService.updateOne({
        id: action.payload.id,
      }, {
        ...action.payload,
      }).pipe(
        map(() => todoCommonActions.todoUpdatedWithSuccess({
          payload: action.payload
        }))
      ),
      onError: (action, error) => todoEditActions.editedWithError({
        payload: { params: action.payload, error }
      }),
    })
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly todoDataService: TodoDataService
  ) {
  }
}
