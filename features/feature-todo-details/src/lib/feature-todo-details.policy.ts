import { GetPermissionsResult, GetPermissionsResultUtils } from '@demo/contracts/contract-common';
import { TodoPermissionsResultActions, TodoPermissionsResultKeys } from '@demo/contracts/contract-todo';
import { PolicyResult } from '@demo/feature-common';
import { Injectable } from '@angular/core';
import { FeatureTodoDetailsPolicyPort } from '@demo/features/feature-todo-common';

@Injectable({
  providedIn: 'root'
})
export class FeatureTodoDetailsPolicy implements FeatureTodoDetailsPolicyPort {
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
