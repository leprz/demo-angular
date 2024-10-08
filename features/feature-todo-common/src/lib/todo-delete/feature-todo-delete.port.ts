import { Observable } from 'rxjs';
import { DeleteOneTodoContract } from '@demo/contracts/contract-todo';
import { HttpRequestState } from 'ngx-http-request-state';

export type FeatureTodoDeletePayload = typeof DeleteOneTodoContract.pathParams;
export type FeatureTodoDeleteResult = HttpRequestState<typeof DeleteOneTodoContract.result>;
export abstract class FeatureTodoDeletePort {
  abstract readonly deleteResult$: (payload: FeatureTodoDeletePayload) => Observable<{ data: FeatureTodoDeleteResult | null }>;
  abstract readonly deleteOneSuccess$: (payload: FeatureTodoDeletePayload) => Observable<FeatureTodoDeletePayload>;
  abstract delete(payload: FeatureTodoDeletePayload): void;
}
