import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {todoResolutionActions, TodoResolutionSelectors, TodoResolutionState} from "./+store/todo-resolution.store";
import {
  FeatureTodoResolution,
  FeatureTodoResolutionPayload,
  FeatureTodoResolutionUpdatePayload
} from "@demo/features/feature-todo-common";

@Injectable()
export class FeatureTodoResolutionImpl implements FeatureTodoResolution {
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

  constructor(private readonly store: Store<TodoResolutionState>) {
  }
}
