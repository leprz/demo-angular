import {createFeature, createReducer, on} from "@ngrx/store";
import {errorState, HttpRequestState, loadedState, loadingState} from "ngx-http-request-state";
import {todoListActions} from "./todo-list.actions";

import {HttpRequestsStateIdle} from "@demo/utils/utils-data-service";
import {ReadManyTodosContract} from "@demo/contracts/contract-todo";

export interface TodoListState {
  todoList: HttpRequestState<typeof ReadManyTodosContract.result>
}

const initialState: TodoListState = {
  todoList: HttpRequestsStateIdle
}
export const todoListReducer = createReducer(
  initialState,
  on(todoListActions.todoListOpened, (state): TodoListState => {
    return {
      ...state,
      todoList: loadingState()
    }
  }),
  on(todoListActions.todoListLoadedWithSuccess, (state, {payload}): TodoListState => {
    return {
      ...state,
      todoList: loadedState(payload)
    }
  }),
  on(todoListActions.todoListLoadedError, (state, {payload}): TodoListState => {
    return {
      ...state,
      todoList: errorState(payload)
    }
  })
);

export const TODO_LIST_FEATURE_KEY = 'todoList';
export const TodoListFeatureState = createFeature(
  {
    name: TODO_LIST_FEATURE_KEY,
    reducer: todoListReducer
  }
);
