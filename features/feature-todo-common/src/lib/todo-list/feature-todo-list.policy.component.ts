import { Component, inject, signal } from '@angular/core';
import { FeaturePermissionsPort, initialPolicyResult, PolicyComponent } from '@demo/feature-common';
import { filterNill } from '@demo/utils/utils-data-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FeatureTodoListPolicyPort } from './feature-todo-list.policy.port';

@Component({
  selector: 'feature-todo-list-policy',
  standalone: true,
  template: `
    <ng-content></ng-content>
  `
})
export class FeatureTodoListPolicyComponent implements PolicyComponent {
  policyResult = signal(initialPolicyResult);
  private readonly policy = inject(FeatureTodoListPolicyPort);
  private readonly permissionsService = inject(FeaturePermissionsPort);

  constructor() {
    this.permissionsService.permissions$
      .pipe(filterNill(), takeUntilDestroyed()).subscribe((response) => {
      this.policyResult.set(this.policy.check(response.value ?? []));
    });
  }
}
