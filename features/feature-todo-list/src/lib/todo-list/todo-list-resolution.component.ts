import { Component, input, output, signal } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import {
  FeatureTodoResolutionPayload,
  FeatureTodoResolutionPort,
  FeatureTodoResolutionResult,
  FeatureTodoResolutionUpdatePayload
} from '@demo/features/feature-todo-common';
import { filterNill, HasErrorPipe, IsLoadingPipe } from '@demo/utils/utils-data-service';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { isLoadingState } from 'ngx-http-request-state';

export type FeatureTodoListResolutionParams = FeatureTodoResolutionPayload  & { isComplete: boolean };
@Component({
  selector: 'feature-todo-list-resolution',
  template: `
    @if (params(); as params) {
      <span
        class="todo-list-resolution">
        @if (resolutionResult$ | async; as resolutionResult) {
          @if (resolutionResult.data | hasError) {
            <span [title]="resolutionResult.data.error.message"
            class="warning icon-exclamation"></span>
          }
          <input
            type="checkbox"
            [disabled]="isDisabled()"
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
  readonly params = input.required<FeatureTodoResolutionUpdatePayload>();
  readonly isDisabled = signal<boolean>(false);
  readonly resolutionChanged = output<boolean>();

  readonly resolutionResult$: Observable<{ data: FeatureTodoResolutionResult | null }> = toObservable(this.params).pipe(
    filterNill(),
    switchMap(params => this.featureTodoResolution.resolutionResult$(params)),
  );

  constructor(
    private readonly featureTodoResolution: FeatureTodoResolutionPort) {
      this.resolutionResult$.pipe(takeUntilDestroyed()).subscribe((result) => {
        this.isDisabled.set(isLoadingState(result.data ?? undefined));
      });
    }

  onResolutionChange(
    event: Event,
    params: {
      id: string;
      isComplete: boolean;
    }
  ): void {
    this.resolutionChanged.emit(!params.isComplete);

    // prevent selecting of the checkbox when task is not complete (for example on error)
    const input: HTMLInputElement = event.target as HTMLInputElement;
    input.checked = params.isComplete;
  }
}
