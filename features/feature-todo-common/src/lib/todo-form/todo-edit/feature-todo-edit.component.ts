import { Component, computed, inject, input } from '@angular/core';
import { FeatureTodoEditPort } from './feature-todo-edit.port';
import { Observable, switchMap } from 'rxjs';
import { PolicyResult } from '@demo/feature-common';
import { HttpRequestState } from 'ngx-http-request-state';
import { UpdateOneTodoBodyParams, UpdateOneTodoPathParams, UpdateOneTodoResult } from '@demo/contracts/contract-todo';
import { toObservable } from '@angular/core/rxjs-interop';
import { filterNill } from '@demo/utils/utils-data-service';

@Component({
  selector: 'feature-todo-edit',
  standalone: true,
  template: `
    @if (!isHidden()) {
      <ng-content></ng-content>
    }
  `
})
export class FeatureTodoEditComponent {
  readonly params = input.required<UpdateOneTodoPathParams | null>();
  readonly policy = input.required<PolicyResult>();

  readonly isHidden = computed(() => this.policy().isHidden);

  readonly featureTodoEdit = inject(FeatureTodoEditPort);

  readonly updateResult$: Observable<HttpRequestState<UpdateOneTodoResult>>
    = toObservable(this.params).pipe(
      filterNill(),
      switchMap((params) => this.featureTodoEdit.todoUpdateResult$(params))
    );

  update(payload: UpdateOneTodoBodyParams & UpdateOneTodoPathParams): void {
    if (this.isHidden()) {
      throw new Error('Cannot update todo when feature is hidden');
    }

    this.featureTodoEdit.updateTodo(payload);
  }
}
