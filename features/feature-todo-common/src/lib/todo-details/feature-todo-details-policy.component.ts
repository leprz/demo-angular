import { Component, inject, signal } from '@angular/core';
import { FeaturePermissionsPort, initialPolicyResult, PolicyComponent } from '@demo/feature-common';
import { filterNill } from '@demo/utils/utils-data-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FeatureTodoDetailsPolicyPort } from './feature-todo-details-policy.port';

@Component({
  selector: 'feature-todo-details-policy',
  standalone: true,
  template: `
    <ng-content></ng-content>
  `
})
export class FeatureTodoDetailsPolicyComponent implements PolicyComponent {
  policyResult = signal(initialPolicyResult);
  private readonly policy = inject(FeatureTodoDetailsPolicyPort);
  private readonly permissionsService = inject(FeaturePermissionsPort);

  constructor() {
    this.permissionsService.permissions$
      .pipe(filterNill(), takeUntilDestroyed()).subscribe((response) => {
      this.policyResult.set(this.policy.check(response.value ?? []));
    });
  }
}
