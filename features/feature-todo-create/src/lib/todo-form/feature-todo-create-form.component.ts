import { Component, inject, output } from '@angular/core';
import { FeatureTodoFormControlsBuilder } from '@demo/features/feature-todo-common';
import { FormBuilder } from '@angular/forms';
import { UuidGen } from '@demo/utils/utils-data-service';

export interface TodoCreateFormData {
  id: string;
  name: string;
}

@Component({
  selector: 'feature-todo-create-form',
  standalone: true,
  template: `
    <ng-content></ng-content>
  `
})
export class FeatureTodoCreateFormComponent {
  formSubmittedSuccessfully = output<TodoCreateFormData>();

  private readonly fb = inject(FormBuilder);
  private readonly fcb = inject(FeatureTodoFormControlsBuilder);
  private readonly uuidGen = inject(UuidGen);

  private readonly controls = this.fcb.controls();

  readonly keys = this.fcb.keys;
  readonly formGroup = this.fb.group({
    [this.keys.id]: this.controls[this.keys.id],
    [this.keys.name]: this.controls[this.keys.name],
  });

  submit(): void {
    this.formGroup.markAllAsTouched();
    this.formGroup.controls[
      this.keys.name
    ].updateValueAndValidity();
    if (this.formGroup.valid) {
      this.formSubmittedSuccessfully.emit({
        name: this.formGroup.controls[this.keys.name].value,
        id: this.formGroup.controls[this.keys.id].value
      });
      this.reset();
    }
  }

  private reset(): void {
    this.formGroup.reset();
    this.formGroup.controls[this.keys.id].setValue(
      this.uuidGen.generate()
    );
  }

  constructor() {
    this.reset();
  }
}
