import { Component, inject, signal } from '@angular/core';
import { FeaturePermissionsPort, initialPolicyResult, PolicyComponent } from '@demo/feature-common';
import { filterNill } from '@demo/utils/utils-data-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FeatureTodoDeletePolicyPort } from './feature-todo-delete.policy.port';

@Component({
  selector: 'feature-todo-delete-policy',
  standalone: true,
  template: `
    <ng-content></ng-content>
  `
})
export class FeatureTodoDeletePolicyProviderComponent implements PolicyComponent {
  policyResult = signal(initialPolicyResult);
  private readonly policy = inject(FeatureTodoDeletePolicyPort);
  private readonly permissionsService = inject(FeaturePermissionsPort);

  constructor() {
    this.permissionsService.permissions$
      .pipe(filterNill(), takeUntilDestroyed()).subscribe((response) => {
      this.policyResult.set(this.policy.check(response.value ?? []));
    });
  }
}
