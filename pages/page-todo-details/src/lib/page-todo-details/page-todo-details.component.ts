import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, take } from 'rxjs';
import { filterNill, HasErrorPipe, IsLoadingPipe } from '@demo/utils/utils-data-service';
import {
  FeatureTodoDelete,
  FeatureTodoDeleteComponent,
  FeatureTodoResolution,
  FeatureTodoResolutionResult,
  UiTodoDeleteButtonComponent
} from '@demo/features/feature-todo-common';
import { ActivatedRoute, Router } from '@angular/router';
import { FeatureTodoDetails } from '@demo/features/feature-todo-details';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UiLoadedContentComponent } from '@demo/ui/ui-loaded-content';
import {
  EditableComponent,
  EditableFocusDirective,
  EditableOnEnterDirective,
  EditableOnEscapeDirective,
  EditModeDirective,
  ViewModeDirective
} from '@ngneat/edit-in-place';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FeatureTodoEdit, TodoEditForm } from '@demo/feature-todo-edit';
import { UiFormErrorsComponent } from '@demo/ui/ui-form-errors';
import { FeaturePermissionsComponent } from '@demo/feature-common';

@Component({
  standalone: true,
  imports: [CommonModule, HasErrorPipe, IsLoadingPipe, UiLoadedContentComponent, EditableComponent,
    ViewModeDirective,
    EditModeDirective, EditableOnEnterDirective, ReactiveFormsModule, EditableFocusDirective, UiFormErrorsComponent, EditableOnEscapeDirective, FeatureTodoDeleteComponent, UiTodoDeleteButtonComponent, FeaturePermissionsComponent
  ],
  templateUrl: './page-todo-details.component.html',
  styleUrls: ['./page-todo-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageTodoDetailsComponent {
  readonly id = this.activatedRoute.snapshot.params['id'];

  readonly todoDetailsResult$ = this.featureTodoDetails.todo$;

  readonly onDeleteSuccess$ = this.featureTodoDelete.deleteOneSuccess$({
    id: this.id
  });

  readonly featureResolutionResult$: Observable<{ data: FeatureTodoResolutionResult | null }>
    = this.featureTodoResolution.resolutionResult$({ id: this.id }).pipe(
    filterNill()
  );

  readonly todoEditForm: TodoEditForm = this.featureTodoEdit.formBuilder.create();

  readonly todoFormGroup: FormGroup = this.todoEditForm.formGroup;

  readonly TodoEditForm = TodoEditForm;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly featureTodoDelete: FeatureTodoDelete,
    private readonly featureTodoDetails: FeatureTodoDetails,
    private readonly featureTodoResolution: FeatureTodoResolution,
    private readonly featureTodoEdit: FeatureTodoEdit
  ) {
    featureTodoDetails.loadTodo(this.id);

    featureTodoDetails.events$(
      this.id
    ).pipe(
      takeUntilDestroyed()
    ).subscribe();

    this.todoDetailsResult$.pipe(
      takeUntilDestroyed(),
      filterNill()
    ).subscribe(todo => {
      const value = todo.value?.content;
      if (value) {
        this.todoEditForm.setName(value.name);
      }
    });

    this.onDeleteSuccess$.pipe(
      takeUntilDestroyed()
    ).subscribe(() => {
      return this.router.navigate(['/'], {
        replaceUrl: true
      });
    });

    this.todoEditForm.successFullySubmitted$.pipe(
      takeUntilDestroyed()
    ).subscribe(() => {
      if (this.todoEditForm.valid) {
        this.featureTodoEdit.edit({
          id: this.id,
          name: this.todoEditForm.value.title
        });
      }
    });
  }

  onResolutionButtonClick(isComplete: boolean): void {
    this.featureTodoResolution.updateResolution({
      id: this.id,
      isComplete: !isComplete
    });
  }

  onEditableSave(): void {
    this.todoEditForm.submit();
  }

  onEditableCancel(): void {
    this.todoDetailsResult$.pipe(
      take(1),
      filterNill()
    ).subscribe(todo => {
      const value = todo.value?.content;
      if (value) {
        this.todoEditForm.setName(value.name);
      }
    });
  }

  onEditableModeChange(): void {
    console.log('mode changed');
    this.todoFormGroup.markAllAsTouched();
    this.todoFormGroup.markAsDirty();
  }
}
