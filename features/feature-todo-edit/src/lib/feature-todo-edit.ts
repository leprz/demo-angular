import { Injectable } from '@angular/core';
import { TodoEditFormBuilder } from './todo-edit.form';
import { todoEditActions, TodoEditState } from './+store/todo-edit.store';
import { Store } from '@ngrx/store';
import { UpdateOneTodoContract } from '@demo/contracts/contract-todo';
import { Actions } from '@ngrx/effects';
import { FeatureTodoEditPort } from '@demo/features/feature-todo-common';

@Injectable()
export class FeatureTodoEdit implements FeatureTodoEditPort{
  constructor(
    public readonly formBuilder: TodoEditFormBuilder,
    private readonly store: Store<TodoEditState>,
    private readonly actions$: Actions
  ) {
  }

  edit(payload: typeof UpdateOneTodoContract.pathParams & typeof UpdateOneTodoContract.bodyParams): void {
    this.store.dispatch(
      todoEditActions.triggered({ payload })
    );
  }
}
