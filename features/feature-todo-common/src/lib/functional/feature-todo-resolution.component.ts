import { Component, computed, input, signal } from '@angular/core';
import { FeatureTodoDeletePayload } from '../feature-todo-delete.port';
import { Observable, switchMap } from 'rxjs';
import { filterNill } from '@demo/utils/utils-data-service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { isLoadingState } from 'ngx-http-request-state';
import {
  GetPermissionsResult,
  GetPermissionsResultUtils,
  PermissionsActionRequestProps,
  PermissionsKeyRequestProps
} from '@demo/contract-permissions';
import {
  FeatureTodoResolution,
  FeatureTodoResolutionResult,
  FeatureTodoResolutionUpdatePayload
} from '../feature-todo-resolution.port';

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
  readonly params = input.required<FeatureTodoDeletePayload>();
  readonly permissions = input.required<GetPermissionsResult>();
  readonly hideWhenDisabled = input<boolean>(false);
  readonly isAllowed = computed(() => GetPermissionsResultUtils.isAllowed(
    this.permissions() ?? [],
    PermissionsKeyRequestProps.todos,
    PermissionsActionRequestProps.write
  ));

  readonly isDisabled = signal<boolean>(false);
  readonly isHidden = computed(() => !this.isAllowed() || this.hideWhenDisabled() && this.isDisabled());

  readonly resolutionResult$: Observable<{ data: FeatureTodoResolutionResult | null }> =
    toObservable(this.params).pipe(
      filterNill(),
      switchMap((payload) => this.featureTodoDelete.resolutionResult$({
        id: payload.id
      }))
    );

  constructor(
    private readonly featureTodoDelete: FeatureTodoResolution,
  ) {
    this.resolutionResult$.pipe(takeUntilDestroyed()).subscribe((result) => {
      this.isDisabled.set(isLoadingState(result.data ?? undefined));
    });
  }

  updateResolution(payload: FeatureTodoResolutionUpdatePayload, isComplete: boolean): void {
    if (!this.isDisabled()) {
      this.featureTodoDelete.updateResolution({ ...payload, isComplete });
    }
  }
}
