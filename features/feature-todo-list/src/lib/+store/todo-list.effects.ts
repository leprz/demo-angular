import {Actions, createEffect, ofType} from "@ngrx/effects";
import {todoListActions} from "./todo-list.actions";
import {fetch} from "@ngrx/router-store/data-persistence";
import {TodoDataService} from "@demo/contracts/contract-todo";
import {map} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class TodoListEffects {
  loadTodoList$ = createEffect(() => this.actions$.pipe(
      ofType(
        todoListActions.todoListOpened,
        todoListActions.silentReloadRequested,
      ),
      fetch({
        run: () => {
          return this.todoListDataService.readManyTodos().pipe(
            map(result => todoListActions.todoListLoadedWithSuccess({payload: result}))
          );
        },
        onError: (action, error) => {
          return todoListActions.todoListLoadedError({payload: error});
        }
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly todoListDataService: TodoDataService
  ) {
  }
}
