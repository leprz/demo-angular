import {Component, Input} from "@angular/core";
import {FeatureTodoDelete, FeatureTodoDeletePayload, FeatureTodoDeleteResult} from "@demo/features/feature-todo-common";
import {filterNill, HasErrorPipe, IsLoadingPipe} from "@demo/utils/utils-data-service";
import { AsyncPipe, JsonPipe } from "@angular/common";
import {BehaviorSubject, Observable, switchMap} from "rxjs";

@Component({
  selector: 'feature-todo-list-delete',
  template: `
    @if (params$ | async; as params) {
      <span
        class="todo-list-delete"
        >
        @if (deleteResult$ | async; as deleteResult) {
          @if (deleteResult.data | hasError) {
            <span [title]="deleteResult.data?.error?.message ?? ''"
            class="warning icon-exclamation"></span>
          }
          <button
            class="btn-icon"
            [disabled]="deleteResult.data | isLoading"
            (click)="onDeleteButtonClick(params)">
            <i class="icon-remove"></i>
          </button>
        }
      </span>
    }
    `,
  styles: [`
    .todo-list-delete {
      display: flex;
      align-items: center;
    }
  `],
  standalone: true,
  imports: [
    AsyncPipe,
    HasErrorPipe,
    IsLoadingPipe,
    JsonPipe
]
})
export class TodoListDeleteComponent {
  readonly params$ = new BehaviorSubject<FeatureTodoDeletePayload | null>(null);

  @Input({required: true}) set params(params:  FeatureTodoDeletePayload) {
    this.params$.next(params);
  };

  readonly deleteResult$: Observable<{ data: FeatureTodoDeleteResult | null }> =
    this.params$.pipe(
      filterNill(),
      switchMap((payload) => this.featureTodoDelete.deleteResult$({
        id: payload.id
      })),
    );

  constructor(
    private readonly featureTodoDelete: FeatureTodoDelete) {
  }

  onDeleteButtonClick(params: FeatureTodoDeletePayload): void {
    this.featureTodoDelete.delete(params);
  }
}
