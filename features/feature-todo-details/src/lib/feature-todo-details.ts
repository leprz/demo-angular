import {Store} from "@ngrx/store";
import {todoDetailsActions, TodoDetailsSelectors, TodoDetailsState} from "./+state/todo-details.store";
import {Injectable} from "@angular/core";

@Injectable()
export class FeatureTodoDetails {
     readonly todo$ = this.store.select(TodoDetailsSelectors.todo);

    loadTodo(id: string): void {
      this.store.dispatch(todoDetailsActions.opened({payload: {id}}));
    }

    constructor(private readonly store: Store<TodoDetailsState>) {
    }
}
