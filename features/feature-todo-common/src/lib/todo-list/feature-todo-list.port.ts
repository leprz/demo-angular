import { Observable } from 'rxjs';
import { ReadManyTodosResult } from '@demo/contracts/contract-todo';
import { HttpRequestState } from 'ngx-http-request-state';

export abstract class FeatureTodoListPort {
  abstract todoList$: Observable<HttpRequestState<ReadManyTodosResult>>;

  abstract loadTodoList(): void;
}
