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
  featureTodoCommonActions,
  FeatureTodoResolutionPayload,
  FeatureTodoResolutionResult,
  FeatureTodoResolutionUpdatePayload
} from "@demo/features/feature-todo-common";

export const todoResolutionActions = createActionGroup({
  source: 'todo resolution',
  events: {
    'todo resolution triggered': props<
      ActionPayload<
        FeatureTodoResolutionPayload
        & FeatureTodoResolutionUpdatePayload
      >
    >(),
    'todo resolution loaded with error': props<ActionPayload<{
      params: FeatureTodoResolutionPayload,
      error: HttpErrorResponse
    }>>(),
  }
});

export const TODO_RESOLUTION_FEATURE_KEY = 'todoResolution';

export interface TodoResolutionState {
  resolutionMap: Record<string, FeatureTodoResolutionResult>;
}

const initialState: TodoResolutionState = {
  resolutionMap: {},
};

export const todoResolutionReducer = createReducer(
  initialState,
  on(featureTodoCommonActions.todoListLoadedWithSuccess, (state) => ({
    ...state,
    resolutionMap: {}
  })),
  on(todoResolutionActions.todoResolutionTriggered, (state, {payload}) => ({
    ...state,
    resolutionMap: {
      ...state.resolutionMap,
      [payload.id]: loadingState(),
    }
  })),
  on(featureTodoCommonActions.todoResolutionUpdatedWithSuccess, (state, {payload}) => ({
        ...state,
        resolutionMap: {
          ...state.resolutionMap,
          [payload.id]: loadedState(undefined),
        }
      }
    ),
  ),
  on(todoResolutionActions.todoResolutionLoadedWithError, (state, {payload}) => ({
      ...state,
      resolutionMap: {
        ...state.resolutionMap,
        [payload.params.id]: errorState(payload.error),
      }
    }
  )),
);

const todoResolutionFeatureSelector = createFeatureSelector<TodoResolutionState>(TODO_RESOLUTION_FEATURE_KEY);

export class TodoResolutionSelectors {
  static resolution = (id: string) => createSelector(
    todoResolutionFeatureSelector,
    (state) => ({
      data: state.resolutionMap[id] ?? null
    })
  )
}

@Injectable()
export class TodoResolutionEffects {
  readonly updateResolution$ = createEffect(() => this.actions$.pipe(
    ofType(todoResolutionActions.todoResolutionTriggered),
    fetch({
      run: ({payload}) => {
        return this.todoDataService.updateResolution(
          {
            id: payload.id
          },
          {
            isComplete: payload.isComplete
          }
        ).pipe(
          map(() => featureTodoCommonActions.todoResolutionUpdatedWithSuccess({
            payload
          }))
        )
      },
      onError: (action, error) => todoResolutionActions.todoResolutionLoadedWithError(
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


