import { Component, computed, inject, input } from '@angular/core';
import { FeatureTodoCreatePort } from './feature-todo-create.port';
import { Observable } from 'rxjs';
import { PolicyResult } from '@demo/feature-common';
import { HttpRequestState } from 'ngx-http-request-state';
import { CreateOneTodoBodyParams, CreateOneTodoResult } from '@demo/contracts/contract-todo';

@Component({
  selector: 'feature-todo-create',
  standalone: true,
  template: `
    @if (!isHidden()) {
      <ng-content></ng-content>
    }
  `
})
export class FeatureTodoCreateComponent {
  readonly policy = input.required<PolicyResult>();

  readonly isHidden = computed(() => this.policy().isHidden);

  readonly featureTodoCreate = inject(FeatureTodoCreatePort);

  readonly createResult$: Observable<HttpRequestState<CreateOneTodoResult>>
    = this.featureTodoCreate.todoCreateResult$;

  create(payload: CreateOneTodoBodyParams): void {
    if (this.isHidden()) {
      throw new Error('Cannot create todo when feature is hidden');
    }

    this.featureTodoCreate.createTodo(payload);
  }
}
