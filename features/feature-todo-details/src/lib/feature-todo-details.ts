import {Store} from "@ngrx/store";
import {todoDetailsActions, TodoDetailsSelectors, TodoDetailsState} from "./+state/todo-details.store";
import {Injectable} from "@angular/core";
import {Actions, ofType} from "@ngrx/effects";
import {todoCommonActions} from "@demo/features/feature-todo-common";
import {tap} from "rxjs";

@Injectable()
export class FeatureTodoDetails {
     readonly todo$ = this.store.select(TodoDetailsSelectors.todo);

     readonly events$ = (id: string) => this.actions$.pipe(
       ofType(
         todoCommonActions.todoResolutionUpdatedWithSuccess,
         todoCommonActions.todoUpdatedWithSuccess
       ),
       tap(() => {
         this.reload(id);
       })
     );

    loadTodo(id: string): void {
      this.store.dispatch(todoDetailsActions.opened({payload: {id}}));
    }

    reload(id: string): void {
      this.store.dispatch(todoDetailsActions.reloaded({payload: {id}}));
    }

    constructor(
      private readonly actions$: Actions,
      private readonly store: Store<TodoDetailsState>) {
    }
}
