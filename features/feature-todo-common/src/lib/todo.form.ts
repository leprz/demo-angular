import { FormBuilder, Validators } from '@angular/forms';
import { inject, Injectable } from '@angular/core';

export const todoFormControlNames = {
  id: 'id',
  name: 'name',
  description: 'description'
} as const;
@Injectable({providedIn: 'root'})
export class TodoForm {
  private readonly fb = inject(FormBuilder);
  public readonly group = this.fb.group({
    [todoFormControlNames.id]: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: true
    }),
    [todoFormControlNames.name]: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true
    }),
    [todoFormControlNames.description]: this.fb.control('')
  });
}
