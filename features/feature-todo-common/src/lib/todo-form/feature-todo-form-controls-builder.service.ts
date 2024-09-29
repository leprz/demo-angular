import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FeatureTodoFormControlsBuilder {
  private readonly fb = inject(FormBuilder);

  readonly keys = {
    id: 'id',
    name: 'name',
    description: 'description'
  } as const;

  readonly controls: () => { [key: string]: FormControl } = () => ({
    [this.keys.id]: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(1)],
      nonNullable: true
    }),
    [this.keys.name]: this.fb.control('', {
      validators: [Validators.required, Validators.minLength(3)],
      nonNullable: true
    }),
    [this.keys.description]: this.fb.control('')
  } as const);
}
