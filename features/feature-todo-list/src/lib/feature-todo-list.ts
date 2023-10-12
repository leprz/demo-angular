import {TodoListSelectors} from "./+store/todo-list.selectors";
import {Store} from "@ngrx/store";
import {TodoListState} from "./+store/todo-list.reducer";
import {todoListActions} from "./+store/todo-list.actions";
import {Injectable} from "@angular/core";

@Injectable()
export class FeatureTodoList {
  todoList$ = this.store.select(TodoListSelectors.todoList);

  loadTodoList(): void {
    this.store.dispatch(todoListActions.todoListOpened());
  }

  constructor(private store: Store<TodoListState>) {
  }
}
