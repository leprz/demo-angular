import {todoCreateActions, TodoCreateSelectors, TodoCreateState,} from './+store/todo-create.store';
import {Store} from '@ngrx/store';
import {CreateOneTodoContract,} from '@demo/contracts/contract-todo';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FeatureTodoCreate {
  createTodoForm$ = this.store.select(TodoCreateSelectors.createTodoForm);

  createTodo(payload: typeof CreateOneTodoContract.bodyParams): void {
    this.store.dispatch(
      todoCreateActions.createTodoSubmitted({
        payload,
      })
    );
  }

  constructor(private readonly store: Store<TodoCreateState>) {}
}
