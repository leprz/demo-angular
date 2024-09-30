import { Observable } from 'rxjs';
import { ReadOneTodoPathParams, ReadOneTodoResult } from '@demo/contracts/contract-todo';
import { HttpRequestState } from 'ngx-http-request-state';
import { Action } from '@ngrx/store';

export abstract class FeatureTodoDetailsPort {
  abstract todoDetails$: Observable<HttpRequestState<ReadOneTodoResult>>;

  abstract reload(data: ReadOneTodoPathParams): void;

  abstract loadTodo(data: ReadOneTodoPathParams): void;

  abstract readonly events$: (id: string) => Observable<Action>;
}
