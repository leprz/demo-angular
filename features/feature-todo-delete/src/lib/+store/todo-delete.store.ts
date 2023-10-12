import {createActionGroup, createFeatureSelector, createReducer, createSelector, on, props} from "@ngrx/store";
import {TodoDataService} from "@demo/contracts/contract-todo";
import {HttpErrorResponse} from "@angular/common/http";
import {ActionPayload} from "@demo/utils/utils-data-service";
import {errorState, loadedState, loadingState} from "ngx-http-request-state";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {fetch} from "@ngrx/router-store/data-persistence";
import {map} from "rxjs";
import {Injectable} from "@angular/core";
import {
  todoCommonActions,
  FeatureTodoDeletePayload,
  FeatureTodoDeleteResult
} from "@demo/features/feature-todo-common";

export const todoDeleteActions = createActionGroup({
  source: 'todo delete',
  events: {
    'triggered': props<ActionPayload<FeatureTodoDeletePayload>>(),
    'loaded with error': props<ActionPayload<{
      params: FeatureTodoDeletePayload,
      error: HttpErrorResponse
    }>>(),
  }
});

export const TODO_DELETE_FEATURE_KEY = 'todoDelete';

export interface TodoDeleteState {
  deleteMap: Record<string, FeatureTodoDeleteResult>;
}

const initialState: TodoDeleteState = {
  deleteMap: {},
};

export const todoDeleteReducer = createReducer(
  initialState,
  on(todoCommonActions.todoListLoadedWithSuccess, (state) => ({
    ...state,
    deleteMap: {}
  })),
  on(todoDeleteActions.triggered, (state, {payload}) => ({
    ...state,
    deleteMap: {
      ...state.deleteMap,
      [payload.id]: loadingState(),
    }
  })),
  on(todoCommonActions.todoDeletedWithSuccess, (state, {payload}) => ({
        ...state,
        deleteMap: {
          ...state.deleteMap,
          [payload.id]: loadedState(undefined),
        }
      }
    ),
  ),
  on(todoDeleteActions.loadedWithError, (state, {payload}) => ({
      ...state,
      deleteMap: {
        ...state.deleteMap,
        [payload.params.id]: errorState(payload.error),
      }
    }
  )),
);

const todoDeleteFeatureSelector = createFeatureSelector<TodoDeleteState>(TODO_DELETE_FEATURE_KEY);

export class TodoDeleteSelectors {
  static delete = (id: string) => createSelector(
    todoDeleteFeatureSelector,
    (state) => ({
      data: state.deleteMap[id]
    })
  )
}

@Injectable()
export class TodoDeleteEffects {
  readonly deleteTodo$ = createEffect(() => this.actions$.pipe(
    ofType(todoDeleteActions.triggered),
    fetch({
      run: (action) => {
        return this.todoDataService.deleteOneTodo(action.payload).pipe(
          map(() => todoCommonActions.todoDeletedWithSuccess({payload: action.payload})
          ))
      },
      onError: (action, error) => todoDeleteActions.loadedWithError(
        {
          payload: {
            params: action.payload,
            error,
          }
        }
      ),
    })
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly todoDataService: TodoDataService
  ) {
  }
}


