import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UiFormErrorsComponent } from '@demo/ui/ui-form-errors';
import {
  FeatureTodoCreateComponent,
  FeatureTodoCreatePolicyComponent,
  FeatureTodoCreatePort
} from '@demo/features/feature-todo-common';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { IsLoadingPipe } from '@demo/utils/utils-data-service';
import { FeatureTodoCreateFormComponent, TodoCreateFormData } from '../feature-todo-create-form.component';

@Component({
  selector: 'feature-todo-create-container',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    UiFormErrorsComponent,
    FeatureTodoCreatePolicyComponent,
    FeatureTodoCreateComponent,
    AsyncPipe,
    IsLoadingPipe,
    JsonPipe,
    FeatureTodoCreateFormComponent,
  ],
  templateUrl: './todo-create-container.component.html',
  styleUrls: ['./todo-create-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoCreateContainerComponent {
  onInputBlur(control: FormControl): void {
     if (control.invalid && !control.value) {
      control.markAsUntouched();
      control.markAsPristine();
      control.updateValueAndValidity();
    }
  }

  onFormSubmit(data: TodoCreateFormData, feature: FeatureTodoCreatePort): void {
    feature.createTodo({
      id: data.id,
      name: data.name,
      isComplete: false,
    })
  }
}
