import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Observable} from "rxjs";
import {filterNill, HasErrorPipe, IsLoadingPipe} from "@demo/utils/utils-data-service";
import {
  FeatureTodoDelete,
  FeatureTodoResolution,
  FeatureTodoResolutionResult
} from "@demo/features/feature-todo-common";
import {ActivatedRoute, Router} from "@angular/router";
import {FeatureTodoDetails} from "@demo/features/feature-todo-details";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {UiLoadedContentComponent} from "@demo/ui/ui-loaded-content";

@Component({
  standalone: true,
  imports: [CommonModule, HasErrorPipe, IsLoadingPipe, UiLoadedContentComponent],
  templateUrl: './page-todo-details.component.html',
  styleUrls: ['./page-todo-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageTodoDetailsComponent {
  readonly id = this.activatedRoute.snapshot.params['id'];

  readonly todoDetailsResult$ = this.featureTodoDetails.todo$;

  readonly deleteResult$ = this.featureTodoDelete.deleteResult$(this.id);

  readonly onDeleteSuccess$ = this.featureTodoDelete.deleteSuccess$({
    id: this.id
  });

  featureResolutionResult$: Observable<{data: FeatureTodoResolutionResult | null }>
    = this.featureTodoResolution.resolutionResult$({id: this.id}).pipe(
    filterNill(),
  );

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly featureTodoDelete: FeatureTodoDelete,
    private readonly featureTodoDetails: FeatureTodoDetails,
    private readonly featureTodoResolution: FeatureTodoResolution,
  ) {
    featureTodoDetails.loadTodo(this.id);

    this.onDeleteSuccess$.pipe(
      takeUntilDestroyed()
    ).subscribe(() => {
      return this.router.navigate(['/todo'], {
        replaceUrl: true
      });
    })
  }

  onResolutionButtonClick(isComplete: boolean): void {
    this.featureTodoResolution.updateResolution({
      id: this.id,
      isComplete: !isComplete,
    });
  }

  onDeleteButtonClick(): void {
    this.featureTodoDelete.delete({
      id: this.id
    });
  }
}
