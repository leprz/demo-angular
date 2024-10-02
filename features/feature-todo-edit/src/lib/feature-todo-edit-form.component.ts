import { Component, effect, inject, input, output } from '@angular/core';
import { FeatureTodoFormControlsBuilder } from '@demo/features/feature-todo-common';
import { FormBuilder } from '@angular/forms';
import { UpdateOneTodoBodyParams } from '@demo/contracts/contract-todo';

export interface TodoEditFormData {
  name?: string;
  description?: string;
}

@Component({
  selector: 'feature-todo-edit-form',
  standalone: true,
  template: `
    <ng-content></ng-content>
  `
})
export class FeatureTodoEditFormComponent {
  params = input.required<UpdateOneTodoBodyParams>();

  formSubmittedSuccessfully = output<TodoEditFormData>();

  private readonly fb = inject(FormBuilder);
  private readonly fcb = inject(FeatureTodoFormControlsBuilder);

  private readonly controls = this.fcb.controls();

  readonly keys = this.fcb.keys;
  readonly formGroup = this.fb.group({
    [this.keys.name]: this.controls[this.keys.name],
    [this.keys.description]: this.controls[this.keys.description],
  });

  submit(key?: keyof typeof this.keys): void {
    this.formGroup.markAllAsTouched();
    this.formGroup.controls[
      this.keys.name
    ].updateValueAndValidity();
    if (this.formGroup.valid) {
      this.formSubmittedSuccessfully.emit({
        name: key === undefined || key === this.keys.name ? this.formGroup.controls[this.keys.name].value : undefined,
        description: key === undefined || key === this.keys.description ? this.formGroup.controls[this.keys.description].value : undefined,
      });
    }
  }

  constructor() {
    effect(() => {
      this.formGroup.controls[this.keys.name].setValue(this.params().name);
      this.formGroup.controls[this.keys.description].setValue(this.params().description);
    });
  }
}
