import { Component, computed, input } from '@angular/core';
import { FeatureTodoDeletePayload, FeatureTodoDeletePort, FeatureTodoDeleteResult } from './feature-todo-delete.port';
import { Observable, switchMap } from 'rxjs';
import { filterNill } from '@demo/utils/utils-data-service';
import { toObservable } from '@angular/core/rxjs-interop';
import { PolicyResult } from '@demo/feature-common';

@Component({
  selector: 'feature-todo-delete',
  standalone: true,
  template: `
    @if (!isHidden()) {
      <ng-content></ng-content>
    }
  `
})
export class FeatureTodoDeleteComponent {
  readonly params = input.required<FeatureTodoDeletePayload>();
  readonly policy = input.required<PolicyResult>();

  readonly isDisabled = computed(() => this.policy().isDisabled || this.policy().isHidden);
  readonly isHidden = computed(() => this.policy().isHidden);

  readonly deleteResult$: Observable<{ data: FeatureTodoDeleteResult | null }> =
    toObservable(this.params).pipe(
      filterNill(),
      switchMap((payload) => this.featureTodoDelete.deleteResult$({
        id: payload.id
      }))
    );

  constructor(
    private readonly featureTodoDelete: FeatureTodoDeletePort
  ) {
  }

  delete(payload: FeatureTodoDeletePayload): void {
    this.featureTodoDelete.delete(payload);
  }
}
