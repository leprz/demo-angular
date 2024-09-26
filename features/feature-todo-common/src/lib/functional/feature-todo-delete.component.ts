import { Component, computed, input, signal } from '@angular/core';
import { FeatureTodoDelete, FeatureTodoDeletePayload, FeatureTodoDeleteResult } from '../feature-todo-delete.port';
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

@Component({
  selector: 'feature-todo-delete',
  standalone: true,
  template: `
    @if (!isHidden()) {
      <ng-content></ng-content>
    }
  `
})
export class FeatureTodoDeleteComponent {
  readonly params = input.required<FeatureTodoDeletePayload>();
  readonly permissions = input.required<GetPermissionsResult>();
  readonly hideWhenDisabled = input<boolean>(false);
  readonly isAllowed = computed(() => GetPermissionsResultUtils.isAllowed(
    this.permissions() ?? [],
    PermissionsKeyRequestProps.todos,
    PermissionsActionRequestProps.delete
  ));

  readonly isDisabled = signal<boolean>(false);
  readonly isHidden = computed(() => !this.isAllowed() || this.hideWhenDisabled() && this.isDisabled());

  readonly deleteResult$: Observable<{ data: FeatureTodoDeleteResult | null }> =
    toObservable(this.params).pipe(
      filterNill(),
      switchMap((payload) => this.featureTodoDelete.deleteResult$({
        id: payload.id
      }))
    );

  constructor(
    private readonly featureTodoDelete: FeatureTodoDelete,
  ) {
    this.deleteResult$.pipe(takeUntilDestroyed()).subscribe((result) => {
      this.isDisabled.set(isLoadingState(result.data ?? undefined));
    });
  }

  delete(payload: FeatureTodoDeletePayload): void {
    if (!this.isDisabled()) {
      this.featureTodoDelete.delete(payload);
    }
  }
}
