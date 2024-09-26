import { Store } from '@ngrx/store';
import { todoDeleteActions, TodoDeleteSelectors, TodoDeleteState } from './+store/todo-delete.store';
import { Injectable } from '@angular/core';
import { FeatureTodoDelete, FeatureTodoDeletePayload, todoCommonActions } from '@demo/features/feature-todo-common';
import { filter, map, Observable } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';
import { FeaturePermissionsPort } from '@demo/feature-common';
import {
  GetPermissionsResultUtils,
  PermissionsActionRequestProps,
  PermissionsKeyRequestProps
} from '@demo/contract-permissions';
import { filterNill } from '@demo/utils/utils-data-service';

@Injectable()
export class FeatureTodoDeleteImpl implements FeatureTodoDelete {
  readonly isAllowedToDelete$ = (payload: FeatureTodoDeletePayload): Observable<boolean> => this.featurePermissions.permissions$.pipe(
    filterNill(),
    map((permissions) => GetPermissionsResultUtils.hasPermissions(
      permissions?.value ?? [],
      PermissionsKeyRequestProps.todos,
      PermissionsActionRequestProps.delete
    ))
  );

  deleteResult$ = (payload: FeatureTodoDeletePayload) => this.store.select(TodoDeleteSelectors.delete(payload.id));

  delete(payload: FeatureTodoDeletePayload): void {
    this.store.dispatch(
      todoDeleteActions.triggered({ payload  })
    );
  }

  deleteSuccess$ = this.actions$.pipe(
    ofType(todoCommonActions.todoDeletedWithSuccess),
    map((action) => action.payload)
  );

  deleteOneSuccess$ = (payload: FeatureTodoDeletePayload) =>
    this.deleteSuccess$.pipe(
      filter((result) => result.id === payload.id)
    );

  constructor(
    private readonly store: Store<TodoDeleteState>,
    private readonly actions$: Actions,
    private readonly featurePermissions: FeaturePermissionsPort,
  ) {}
}
