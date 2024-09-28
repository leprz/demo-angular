import { Component, computed, inject, input, signal } from '@angular/core';
import { FeatureTodoListPort } from './feature-todo-list.port';
import { Observable, switchMap } from 'rxjs';
import { filterNill } from '@demo/utils/utils-data-service';
import { toObservable } from '@angular/core/rxjs-interop';
import { PolicyResult } from '@demo/feature-common';
import { HttpRequestState } from 'ngx-http-request-state';
import { ReadManyTodosResult } from '@demo/contracts/contract-todo';

@Component({
  selector: 'feature-todo-list',
  standalone: true,
  template: `
    @if (!isHidden()) {
      <ng-content></ng-content>
    }
  `
})
export class FeatureTodoListComponent {
  readonly params = signal(true); // this may be used to pass filters, sorting or other parameters
  readonly policy = input.required<PolicyResult>();

  readonly isHidden = computed(() => this.policy().isHidden);

  readonly featureTodoList = inject(FeatureTodoListPort);

  readonly todoList$: Observable<HttpRequestState<ReadManyTodosResult>> =
    toObservable(this.params).pipe(
      filterNill(),
      switchMap(() => this.featureTodoList.todoList$)
    );

  load(): void {
    this.featureTodoList.loadTodoList();
  }
}
