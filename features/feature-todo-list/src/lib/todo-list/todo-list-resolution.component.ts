import {Component, Input} from "@angular/core";
import {BehaviorSubject, Observable, switchMap} from "rxjs";
import {
  FeatureTodoResolution,
  FeatureTodoResolutionPayload,
  FeatureTodoResolutionResult,
} from "@demo/features/feature-todo-common";
import {filterNill, HasErrorPipe, IsLoadingPipe} from "@demo/utils/utils-data-service";
import { AsyncPipe } from "@angular/common";

export type FeatureTodoListResolutionParams = FeatureTodoResolutionPayload  & { isComplete: boolean };
@Component({
  selector: 'feature-todo-list-resolution',
  template: `
    @if (params$ | async; as params) {
      <span
        class="todo-list-resolution">
        @if (resolutionResult$ | async; as resolutionResult) {
          @if (resolutionResult.data | hasError) {
            <span [title]="resolutionResult.data?.error?.message"
            class="warning icon-exclamation"></span>
          }
          <input
            type="checkbox"
            [disabled]="resolutionResult.data | isLoading"
            [checked]="params.isComplete"
            (change)="onResolutionChange($event, params)"
            >
        }
      </span>
    }
    `,
  styles: [`
    .todo-list-resolution {
      display: flex;
      align-items: center;
    }
    .warning {
      position: absolute;
      margin-left: -1.25rem;
    }
  `],
  standalone: true,
  imports: [
    AsyncPipe,
    HasErrorPipe,
    IsLoadingPipe
]
})
export class TodoListResolutionComponent {
  readonly params$ = new BehaviorSubject<FeatureTodoListResolutionParams | null>(null);

  @Input({required: true}) set params(params:  FeatureTodoListResolutionParams) {
    this.params$.next(params);
  };

  readonly resolutionResult$: Observable<{ data: FeatureTodoResolutionResult | null }> = this.params$.pipe(
    filterNill(),
    switchMap(params => this.featureTodoResolution.resolutionResult$(params)),
  );

  constructor(
    private readonly featureTodoResolution: FeatureTodoResolution) {
  }

  onResolutionChange(
    event: Event,
    params: {
      id: string;
      isComplete: boolean;
    }
  ): void {
    this.featureTodoResolution.updateResolution({
      ...params,
      isComplete: !params.isComplete,
    });
    const input: HTMLInputElement = event.target as HTMLInputElement;
    input.checked = params.isComplete;
  }
}
