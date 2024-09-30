import { PolicyResult } from '@demo/feature-common';
import { GetPermissionsResult } from '@demo/contracts/contract-common';

export abstract class FeatureTodoDetailsPolicyPort {
  abstract check(permissions: GetPermissionsResult): PolicyResult;
}
