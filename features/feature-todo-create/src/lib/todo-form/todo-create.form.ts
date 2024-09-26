import { NonNullableFormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { UuidGen } from '@demo/utils/utils-data-service';
import { Injectable } from '@angular/core';
import { TodoForm, todoFormControlNames } from '@demo/features/feature-todo-common';

export interface TodoCreateFormData {
  [todoFormControlNames.id]: string;
  [todoFormControlNames.name]: string;
}

@Injectable()
export class TodoCreateForm {
  readonly formGroup = this.fb.group({
    [todoFormControlNames.id]: this.todoForm.group.controls.id,
    [todoFormControlNames.name]: this.todoForm.group.controls.name,
  });

  private readonly submitted = new Subject<TodoCreateFormData>();
  readonly submitted$ = this.submitted.asObservable();

  submit(): void {
    this.formGroup.markAllAsTouched();
    this.formGroup.controls[
      todoFormControlNames.name
    ].updateValueAndValidity();
    if (this.formGroup.valid) {
      this.submitted.next({
        [todoFormControlNames.id]: this.formGroup.controls[todoFormControlNames.id].value,
        [todoFormControlNames.name]: this.formGroup.controls[todoFormControlNames.name].value,
      });
      this.reset();
    }
  }

  private reset(): void {
    this.formGroup.reset();
    this.formGroup.controls[todoFormControlNames.id].setValue(
      this.uuidGen.generate()
    );
  }

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly uuidGen: UuidGen,
    private readonly todoForm: TodoForm
  ) {
    this.reset();
  }
}
