import { Component, inject, signal } from '@angular/core';
import { FeaturePermissionsPort, initialPolicyResult, PolicyComponent } from '@demo/feature-common';
import { filterNill } from '@demo/utils/utils-data-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FeatureTodoCreatePolicyPort } from './feature-todo-create.policy.port';

@Component({
  selector: 'feature-todo-create-policy',
  standalone: true,
  template: `
    <ng-content></ng-content>
  `
})
export class FeatureTodoCreatePolicyComponent implements PolicyComponent {
  policyResult = signal(initialPolicyResult);
  private readonly policy = inject(FeatureTodoCreatePolicyPort);
  private readonly permissionsService = inject(FeaturePermissionsPort);

  constructor() {
    this.permissionsService.permissions$
      .pipe(filterNill(), takeUntilDestroyed()).subscribe((response) => {
      this.policyResult.set(this.policy.check(response.value ?? []));
    });
  }
}
