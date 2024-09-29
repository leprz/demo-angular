import {
  createActionGroup,
  createFeature,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
  Store
} from "@ngrx/store";
import {errorState, HttpRequestState, loadedState, loadingState} from "ngx-http-request-state";
import {ReadOneTodoContract, TodoDataService} from "@demo/contracts/contract-todo";
import {ActionPayload, HttpRequestsStateIdle} from "@demo/utils/utils-data-service";
import {HttpErrorResponse} from "@angular/common/http";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {Injectable} from "@angular/core";
import {fetch} from "@nx/angular";
import {map} from "rxjs";

const TODO_DETAILS_FEATURE_KEY = 'todoDetails';

export const todoDetailsActions = createActionGroup({
  source: 'todo details',
  events: {
    'opened': props<ActionPayload<typeof ReadOneTodoContract.pathParams>>(),
    'reloaded': props<ActionPayload<typeof ReadOneTodoContract.pathParams>>(),
    'loaded success': props<ActionPayload<typeof ReadOneTodoContract.result>>(),
    'loaded error': props<ActionPayload<HttpErrorResponse>>(),
    'silent reload requested': props<ActionPayload<typeof ReadOneTodoContract.pathParams>>(),
  }
})

export interface TodoDetailsState {
  todo: HttpRequestState<typeof ReadOneTodoContract.result>;
}

const initialState: TodoDetailsState = {
  todo: HttpRequestsStateIdle
}

export const todoDetailsReducer = createReducer(
  initialState,
  on(todoDetailsActions.opened, (state) => ({
    ...state,
    todo: loadingState(),
  })),
  on(todoDetailsActions.loadedSuccess, (state, {payload}) => ({
    ...state,
    todo: loadedState(payload),
  })),
  on(todoDetailsActions.loadedError, (state, {payload}) => ({
    ...state,
    todo: errorState(payload),
  })),
);

export const todoDetailsFeatureState = createFeature({
  name: TODO_DETAILS_FEATURE_KEY,
  reducer: todoDetailsReducer,
});

export class TodoDetailsSelectors {
  private static todoDetailsFeatureState = createFeatureSelector<TodoDetailsState>(TODO_DETAILS_FEATURE_KEY);
  static todo = createSelector(
    this.todoDetailsFeatureState,
    state => state.todo
  )
}

@Injectable()
export class TodoDetailsEffects {
  readonly loadTodoDetails$ = createEffect(() => this.actions$.pipe(
    ofType(todoDetailsActions.opened, todoDetailsActions.silentReloadRequested),
    fetch({
      run: ({payload}) => this.todoDataService.readOneById({
        id: payload.id
      }).pipe(
        map(
          todo => todoDetailsActions.loadedSuccess({payload: todo})
        )
      ),
      onError: (action, error) => todoDetailsActions.loadedError({payload: error})
    })
  ));

  readonly reloadTodoDetails$ = createEffect(() => this.actions$.pipe(
    ofType(todoDetailsActions.reloaded),
    fetch({
      run: ({payload}) => this.todoDataService.readOneById({
        id: payload.id
      }).pipe(
        map(todo => todoDetailsActions.loadedSuccess({payload: todo}))
      ),
      onError: (action, error) => todoDetailsActions.loadedError({payload: error})
    })
  ));

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<TodoDetailsState>,
    private readonly todoDataService: TodoDataService) {
  }
}
