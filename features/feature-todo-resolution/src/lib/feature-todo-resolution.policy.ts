import { GetPermissionsResult, GetPermissionsResultUtils } from '@demo/contracts/contract-common';
import { TodoPermissionsResultActions, TodoPermissionsResultKeys } from '@demo/contracts/contract-todo';
import { PolicyResult } from '@demo/feature-common';
import { Injectable } from '@angular/core';
import { FeatureTodoResolutionPolicyPort } from '@demo/features/feature-todo-common';

@Injectable({
  providedIn: 'root'
})
export class FeatureTodoResolutionPolicy implements FeatureTodoResolutionPolicyPort {
  check(permissions: GetPermissionsResult): PolicyResult {
    const isAllowed = GetPermissionsResultUtils.isAllowed(
      permissions ?? [],
      TodoPermissionsResultKeys.todos,
      TodoPermissionsResultActions.write
    );
    return {
      isHidden: !isAllowed,
      isDisabled: !isAllowed
    };
  }
}
