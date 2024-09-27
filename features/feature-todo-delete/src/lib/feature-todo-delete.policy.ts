import { GetPermissionsResult, GetPermissionsResultUtils } from '@demo/contracts/contract-common';
import { TodoPermissionsResultActions, TodoPermissionsResultKeys } from '@demo/contracts/contract-todo';
import { PolicyResult } from '@demo/feature-common';
import { Injectable } from '@angular/core';
import { FeatureTodoDeletePolicyPort } from '@demo/features/feature-todo-common';

@Injectable({
  providedIn: 'root'
})
export class FeatureTodoDeletePolicy implements FeatureTodoDeletePolicyPort {
  check(permissions: GetPermissionsResult): PolicyResult {
    const isAllowed = GetPermissionsResultUtils.isAllowed(
      permissions ?? [],
      TodoPermissionsResultKeys.todos,
      TodoPermissionsResultActions.delete
    );
    return {
      isHidden: !isAllowed,
      isDisabled: !isAllowed
    };
  }
}
