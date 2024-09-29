import { Component, inject, signal } from '@angular/core';
import { FeaturePermissionsPort, initialPolicyResult, PolicyComponent } from '@demo/feature-common';
import { filterNill } from '@demo/utils/utils-data-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FeatureTodoEditPolicyPort } from './feature-todo-edit-policy.port';

@Component({
  selector: 'feature-todo-edit-policy',
  standalone: true,
  template: `
    <ng-content></ng-content>
  `
})
export class FeatureTodoEditPolicyComponent implements PolicyComponent {
  readonly policyResult = signal(initialPolicyResult);
  private readonly policy = inject(FeatureTodoEditPolicyPort);
  private readonly permissionsService = inject(FeaturePermissionsPort);

  constructor() {
    this.permissionsService.permissions$
      .pipe(filterNill(), takeUntilDestroyed()).subscribe((response) => {
      this.policyResult.set(this.policy.check(response.value ?? []));
    });
  }
}
