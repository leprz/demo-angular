import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';

export interface TodoEditFormGroup {
  title: string;
  description: string;
}

export class TodoEditForm {
  static readonly FIELD_TITLE = 'title';
  static readonly FIELD_DESCRIPTION = 'description';

  successFullySubmitted$ = new Subject();
  constructor(public formGroup: FormGroup) {}

  get value(): TodoEditFormGroup {
    return this.formGroup.value;
  }

  get valid(): boolean {
    return this.formGroup.valid;
  }

  setName(name: string): void {
    this.formGroup.get(TodoEditForm.FIELD_TITLE)?.setValue(name);
  }

  submit(): void {
    if (this.formGroup.valid) {
      this.successFullySubmitted$.next(undefined);
    }
  }
}

@Injectable()
export class TodoEditFormBuilder {
  constructor(private readonly fb: FormBuilder) {
  }
  create(): TodoEditForm {
    const formGroup = this.fb.nonNullable.group({
      [TodoEditForm.FIELD_TITLE]: this.fb.nonNullable.control('', [Validators.required, Validators.minLength(3)]),
      [TodoEditForm.FIELD_DESCRIPTION]: this.fb.control(''),
    });

    return new TodoEditForm(formGroup);
  }
}
