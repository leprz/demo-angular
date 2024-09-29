import { Observable } from 'rxjs';
import { CreateOneTodoBodyParams, CreateOneTodoResult } from '@demo/contracts/contract-todo';
import { HttpRequestState } from 'ngx-http-request-state';

export abstract class FeatureTodoCreatePort {
  abstract todoCreateResult$: Observable<HttpRequestState<CreateOneTodoResult>>;

  abstract todoCreateOneSuccess$: Observable<CreateOneTodoBodyParams>;

  abstract createTodo(payload: CreateOneTodoBodyParams): void;
}
