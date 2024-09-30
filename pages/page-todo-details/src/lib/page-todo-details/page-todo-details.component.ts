import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasErrorPipe, IsLoadingPipe } from '@demo/utils/utils-data-service';
import {
  FeatureTodoDeleteComponent,
  FeatureTodoDeletePolicyProviderComponent,
  FeatureTodoDeletePort, FeatureTodoDetailsComponent, FeatureTodoDetailsPolicyComponent,
  FeatureTodoEditComponent,
  FeatureTodoEditPolicyComponent,
  FeatureTodoEditPort,
  FeatureTodoResolutionComponent,
  UiTodoDeleteButtonComponent
} from '@demo/features/feature-todo-common';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureTodoDetails } from '@demo/features/feature-todo-details';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UiLoadedContentComponent } from '@demo/ui/ui-loaded-content';
import { EditableComponent, EditableOnEscapeDirective, ViewModeDirective } from '@ngneat/edit-in-place';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FeatureTodoEditFormComponent, TodoEditFormData } from '@demo/feature-todo-edit';
import { UiFormErrorsComponent } from '@demo/ui/ui-form-errors';
import { FeaturePermissionsComponent } from '@demo/feature-common';
import { UiLoadingComponent } from '@demo/ui/ui-loading';
import { PageTodoDetailsFeatureDeleteProviderComponent } from './page-todo-details-feature-delete-provider.component';
import { UiInputInlineEditableComponent, UiTextareaInlineEditableComponent } from '@demo/ui-input';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    HasErrorPipe,
    IsLoadingPipe,
    UiLoadedContentComponent,
    EditableComponent,
    ViewModeDirective,
    ReactiveFormsModule,
    UiFormErrorsComponent,
    EditableOnEscapeDirective,
    FeatureTodoDeleteComponent,
    UiTodoDeleteButtonComponent,
    FeaturePermissionsComponent,
    FeatureTodoResolutionComponent,
    FeatureTodoDeletePolicyProviderComponent,
    UiLoadingComponent,
    PageTodoDetailsFeatureDeleteProviderComponent,
    FeatureTodoEditComponent,
    FeatureTodoEditPolicyComponent,
    FeatureTodoEditFormComponent,
    UiInputInlineEditableComponent,
    UiTextareaInlineEditableComponent,
    FeatureTodoDetailsPolicyComponent,
    FeatureTodoDetailsComponent
  ],
  templateUrl: './page-todo-details.component.html',
  styleUrls: ['./page-todo-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTodoDetailsComponent {
  readonly id: string = this.activatedRoute.snapshot.params['id'];

  readonly onDeleteSuccess$ = this.featureTodoDelete.deleteOneSuccess$({
    id: this.id
  });

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly featureTodoDelete: FeatureTodoDeletePort,
    private readonly featureTodoDetails: FeatureTodoDetails,
  ) {
    featureTodoDetails.loadTodo({
      id: this.id
    });

    this.onDeleteSuccess$.pipe(
      takeUntilDestroyed()
    ).subscribe(() => {
      return this.router.navigate(['/'], {
        replaceUrl: true
      });
    });

    this.featureTodoDetails.events$(this.id).pipe(
      takeUntilDestroyed(),
    ).subscribe();
  }

  onEditableModeChange(formGroup: FormGroup): void {
    formGroup.markAllAsTouched();
    formGroup.markAsDirty();
  }

  onUpdateSubmittedSuccessfully(data: TodoEditFormData, featureTodoEdit: FeatureTodoEditPort) {
    featureTodoEdit.updateTodo({
      id: this.id,
      name: data.name,
      description: data.description
    });
  }
}
