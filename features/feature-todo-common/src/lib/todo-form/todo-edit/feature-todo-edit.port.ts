import { Observable } from 'rxjs';
import { UpdateOneTodoBodyParams, UpdateOneTodoPathParams, UpdateOneTodoResult } from '@demo/contracts/contract-todo';
import { HttpRequestState } from 'ngx-http-request-state';

export abstract class FeatureTodoEditPort {
  abstract todoUpdateResult$: (payload: UpdateOneTodoPathParams) => Observable<HttpRequestState<UpdateOneTodoResult>>;

  abstract todoUpdateOneSuccess$: Observable<UpdateOneTodoPathParams & UpdateOneTodoBodyParams>;

  abstract updateTodo(payload: UpdateOneTodoBodyParams & UpdateOneTodoPathParams): void;
}
