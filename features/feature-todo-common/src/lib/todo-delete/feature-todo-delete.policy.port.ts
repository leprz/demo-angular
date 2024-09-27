import { PolicyResult } from '@demo/feature-common';
import { GetPermissionsResult } from '@demo/contracts/contract-common';

export abstract class FeatureTodoDeletePolicyPort {
  abstract check(permissions: GetPermissionsResult): PolicyResult;
}
