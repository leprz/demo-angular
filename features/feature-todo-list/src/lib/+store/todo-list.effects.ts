import { Actions, createEffect, ofType } from '@ngrx/effects';
import { todoListActions } from './todo-list.actions';
import { fetch } from '@ngrx/router-store/data-persistence';
import { TodoDataServicePort } from '@demo/contracts/contract-todo';
import { map } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class TodoListEffects {
  loadTodoList$ = createEffect(() => this.actions$.pipe(
      ofType(
        todoListActions.opened,
        todoListActions.silentReloadRequested,
      ),
      fetch({
        run: () => {
          return this.todoListDataService.readMany().pipe(
            map(result => todoListActions.loadedWithSuccess({payload: result}))
          );
        },
        onError: (_, error) => {
          return todoListActions.loadedWithError({payload: error});
        }
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly todoListDataService: TodoDataServicePort
  ) {
  }
}
