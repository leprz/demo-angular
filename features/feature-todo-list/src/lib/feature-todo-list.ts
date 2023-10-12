import {TodoListSelectors} from "./+store/todo-list.selectors";
import {Store} from "@ngrx/store";
import {TodoListState} from "./+store/todo-list.reducer";
import {todoListActions} from "./+store/todo-list.actions";
import {Injectable} from "@angular/core";
import {Actions, ofType} from "@ngrx/effects";
import {featureTodoCommonActions} from "@demo/features/feature-todo-common";
import {tap} from "rxjs";

@Injectable()
export class FeatureTodoList {
  todoList$ = this.store.select(TodoListSelectors.todoList);

  loadTodoList(): void {
    this.store.dispatch(todoListActions.todoListOpened());
  }

  events$ = this.actions$.pipe(
    ofType(
      featureTodoCommonActions.todoDeletedWithSuccess,
      featureTodoCommonActions.todoResolutionUpdatedWithSuccess,
    ),
    tap(() => {
      this.store.dispatch(todoListActions.silentReloadRequested())
    }),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<TodoListState>) {
  }
}
