import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TODO_LIST_FEATURE_KEY, TodoListState} from "./todo-list.reducer";

export const todoListState = createFeatureSelector<TodoListState>(TODO_LIST_FEATURE_KEY);

export class TodoListSelectors {
  static todoList = createSelector(
    todoListState,
    (state) => state.todoList
  )
}
