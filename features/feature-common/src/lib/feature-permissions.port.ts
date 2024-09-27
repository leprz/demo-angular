import { Observable } from 'rxjs';
import { GetPermissionsResult } from '@demo/contracts/contract-common';
import { HttpRequestState } from 'ngx-http-request-state';

export abstract class FeaturePermissionsPort {
  abstract permissions$: Observable<
    HttpRequestState<GetPermissionsResult | null>
  >;
  abstract load(): void;
}
