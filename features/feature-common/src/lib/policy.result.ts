import { WritableSignal } from '@angular/core';

export type PolicyResult = { isDisabled: boolean, isHidden: boolean };
export const initialPolicyResult: PolicyResult = { isDisabled: true, isHidden: true };

export interface PolicyComponent {
  policyResult: WritableSignal<PolicyResult>;
}
