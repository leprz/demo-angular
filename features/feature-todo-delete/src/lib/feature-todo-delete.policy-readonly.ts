import { PolicyResult } from '@demo/feature-common';
import { Injectable } from '@angular/core';
import { FeatureTodoDeletePolicyPort } from '@demo/features/feature-todo-common';

@Injectable({
  providedIn: 'root'
})
export class FeatureTodoDeletePolicyReadonly implements FeatureTodoDeletePolicyPort {
  check(): PolicyResult {
    return {
      isHidden: false,
      isDisabled: true
    }
  }
}
