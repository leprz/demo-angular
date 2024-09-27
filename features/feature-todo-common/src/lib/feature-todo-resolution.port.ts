import {Observable} from "rxjs";
import {HttpRequestState} from "ngx-http-request-state";
import {UpdateOneTodoResolutionContract} from "@demo/contracts/contract-todo";

export type FeatureTodoResolutionPayload = typeof UpdateOneTodoResolutionContract.pathParams;
export type FeatureTodoResolutionResult = HttpRequestState<typeof UpdateOneTodoResolutionContract.result>;
export type FeatureTodoResolutionUpdatePayload = typeof UpdateOneTodoResolutionContract.pathParams & typeof UpdateOneTodoResolutionContract.bodyParams;
export abstract class FeatureTodoResolutionPort {
  abstract readonly resolutionResult$: (payload: FeatureTodoResolutionPayload) => Observable<{ data: FeatureTodoResolutionResult | null }>
  abstract updateResolution(payload: FeatureTodoResolutionUpdatePayload): void
}
