import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { UuidGen } from '@demo/utils/utils-data-service';
import { Injectable } from '@angular/core';

export interface TodoCreateFormData {
  [TodoCreateForm.CONTROL_NAME_ID]: string;
  [TodoCreateForm.CONTROL_NAME_NAME]: string;
}

@Injectable()
export class TodoCreateForm {
  static readonly CONTROL_NAME_ID = 'id';
  static readonly CONTROL_NAME_NAME = 'name';

  readonly formGroup = this.fb.group({
    [TodoCreateForm.CONTROL_NAME_ID]: [
      '',
      [Validators.required, Validators.minLength(1)],
    ],
    [TodoCreateForm.CONTROL_NAME_NAME]: [
      '',
      [Validators.required, Validators.minLength(3)],
    ],
  });

  private readonly submitted = new Subject<TodoCreateFormData>();
  readonly submitted$ = this.submitted.asObservable();

  submit(): void {
    this.formGroup.markAllAsTouched();
    this.formGroup.controls[
      TodoCreateForm.CONTROL_NAME_NAME
    ].updateValueAndValidity();
    if (this.formGroup.valid) {
      this.submitted.next({
        id: this.formGroup.controls[TodoCreateForm.CONTROL_NAME_ID].value,
        name: this.formGroup.controls[TodoCreateForm.CONTROL_NAME_NAME].value,
      });
      this.reset();
    }
  }

  private reset(): void {
    this.formGroup.reset();
    this.formGroup.controls[TodoCreateForm.CONTROL_NAME_ID].setValue(
      this.uuidGen.generate()
    );
  }

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly uuidGen: UuidGen
  ) {
    this.reset();
  }
}
