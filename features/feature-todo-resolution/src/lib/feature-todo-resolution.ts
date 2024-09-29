import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { todoResolutionActions, TodoResolutionSelectors, TodoResolutionState } from './+store/todo-resolution.store';
import {
  FeatureTodoResolutionPayload,
  FeatureTodoResolutionPort,
  FeatureTodoResolutionUpdatePayload
} from '@demo/features/feature-todo-common';
import { Actions } from '@ngrx/effects';

@Injectable()
export class FeatureTodoResolutionImpl implements FeatureTodoResolutionPort {
  readonly resolutionResult$ = (payload: FeatureTodoResolutionPayload) =>
    this.store.select(TodoResolutionSelectors.resolution(payload.id));

  updateResolution(payload: FeatureTodoResolutionUpdatePayload): void {
    this.store.dispatch(todoResolutionActions.triggered({
      payload: {
        isComplete: payload.isComplete,
        id: payload.id,
      }
    }))
  }

  constructor(
    private readonly store: Store<TodoResolutionState>,
    private readonly actions$: Actions
  ) {
  }
}
