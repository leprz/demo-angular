import { Component, computed, inject, input, signal } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { filterNill } from '@demo/utils/utils-data-service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FeaturePermissionsPort, initialPolicyResult, PolicyResult } from '@demo/feature-common';
import { UpdateOneTodoResolutionBodyParams, UpdateOneTodoResolutionPathParams } from '@demo/contracts/contract-todo';
import { FeatureTodoResolutionPort, FeatureTodoResolutionResult } from './feature-todo-resolution.port';
import { FeatureTodoResolutionPolicyPort } from './feature-todo-resolution.policy.port';

@Component({
  selector: 'feature-todo-resolution',
  standalone: true,
  template: `
    @if (!isHidden()) {
      <ng-content></ng-content>
    }
  `
})
export class FeatureTodoResolutionComponent {
  readonly params = input.required<UpdateOneTodoResolutionPathParams>();
  readonly policy = signal<PolicyResult>(initialPolicyResult);

  readonly isDisabled = computed(() => this.policy().isDisabled || this.policy().isHidden);
  readonly isHidden = computed(() => this.policy().isHidden);

  readonly resolutionResult$: Observable<{ data: FeatureTodoResolutionResult | null }> =
    toObservable(this.params).pipe(
      filterNill(),
      switchMap((payload) => this.featureTodoResolution.resolutionResult$({
        id: payload.id
      }))
    );

  readonly featureTodoResolution = inject(FeatureTodoResolutionPort);
  private readonly featurePolicy = inject(FeatureTodoResolutionPolicyPort);
  private readonly featurePermissions = inject(FeaturePermissionsPort);

  constructor(
  ) {
    this.featurePermissions.permissions$
      .pipe(filterNill(), takeUntilDestroyed()).subscribe((response) => {
      this.policy.set(this.featurePolicy.check(response.value ?? []));
    });
  }

  updateResolution(
    payload: UpdateOneTodoResolutionPathParams,
    body: UpdateOneTodoResolutionBodyParams): void {
    this.featureTodoResolution.updateResolution({
      ...payload,
      ...body
    });
  }

  toggleResolution(
    payload: UpdateOneTodoResolutionPathParams & UpdateOneTodoResolutionBodyParams): void {
    this.updateResolution(
      payload,
      {
        isComplete: !payload.isComplete
      }
    );
  }
}
