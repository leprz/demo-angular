import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FeatureTodoCreate } from '../feature-todo-create';
import { TodoCreateForm, TodoCreateFormData } from './todo-create.form';
import { UiFormErrorsComponent } from '@demo/ui/ui-form-errors';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'feature-todo-create',
  standalone: true,
  imports: [ReactiveFormsModule, UiFormErrorsComponent],
  templateUrl: './todo-create.component.html',
  styleUrls: ['./todo-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TodoCreateForm],
})
export class TodoCreateComponent {
  protected readonly TodoFormForm = TodoCreateForm;
  readonly formGroup = this.todoForm.formGroup;

  @Input() set formData(value: TodoCreateFormData | null) {
    if (value) {
      this.formGroup.patchValue(value);
    }
  }

  constructor(
    private readonly todoForm: TodoCreateForm,
    private readonly featureTodoForm: FeatureTodoCreate
  ) {
    this.todoForm.submitted$.pipe(takeUntilDestroyed()).subscribe((payload) => {
      this.featureTodoForm.createTodo({ ...payload, isComplete: false });
    });
  }

  onSubmit(): void {
    this.todoForm.submit();
  }

  onInputBlur(control: FormControl): void {
    control.updateValueAndValidity();
  }
}
