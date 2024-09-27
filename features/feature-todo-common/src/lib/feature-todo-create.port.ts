import { Observable } from 'rxjs';
import { HttpRequestState } from 'ngx-http-request-state';

export abstract class FeatureTodoCreatePort {
  abstract createTodoForm$: Observable<HttpRequestState<void>>;
}
