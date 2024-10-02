import { FeatureTodoListPolicyPort } from '@demo/features/feature-todo-common';
import { GetPermissionsResult, GetPermissionsResultUtils } from '@demo/contracts/contract-common';
import { PolicyResult } from '@demo/feature-common';
import { TodoPermissionsResultActions, TodoPermissionsResultKeys } from '@demo/contracts/contract-todo';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FeatureTodoListPolicy implements FeatureTodoListPolicyPort {
  check(permissions: GetPermissionsResult): PolicyResult {
    return {
      isHidden: !GetPermissionsResultUtils.isAllowed(
        permissions,
        TodoPermissionsResultKeys.todos,
        TodoPermissionsResultActions.read
      ),
      isDisabled: false,
    }
  }
}
