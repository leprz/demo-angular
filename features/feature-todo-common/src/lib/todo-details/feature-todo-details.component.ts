import { Component, computed, inject, input } from '@angular/core';
import { FeatureTodoDetailsPort } from './feature-todo-details.port';
import { PolicyResult } from '@demo/feature-common';
import { ReadOneTodoPathParams } from '@demo/contracts/contract-todo';

@Component({
  selector: 'feature-todo-details',
  standalone: true,
  template: `
    @if (!isHidden()) {
      <ng-content></ng-content>
    }
  `
})
export class FeatureTodoDetailsComponent {
  readonly policy = input.required<PolicyResult>();

  readonly isHidden = computed(() => this.policy().isHidden);

  readonly featureTodoDetails = inject(FeatureTodoDetailsPort);

  readonly todoDetails$ = this.featureTodoDetails.todoDetails$;

  load(params: ReadOneTodoPathParams): void {
    this.featureTodoDetails.loadTodo(params);
  }
}
