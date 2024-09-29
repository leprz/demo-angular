import { Component, effect, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  EditableComponent,
  EditableFocusDirective,
  EditableOnEnterDirective,
  EditableOnEscapeDirective,
  EditModeDirective,
  ViewModeDirective
} from '@ngneat/edit-in-place';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { UiFormErrorsComponent } from '@demo/ui/ui-form-errors';

@Component({
  selector: 'ui-textarea-inline-editable',
  standalone: true,
  imports: [
    CommonModule,
    EditModeDirective,
    EditableComponent,
    EditableFocusDirective,
    EditableOnEnterDirective,
    EditableOnEscapeDirective,
    ReactiveFormsModule,
    UiFormErrorsComponent,
    ViewModeDirective,
  ],
  templateUrl: './ui-textarea-inline-editable.component.html',
  styleUrl: './ui-textarea-inline-editable.component.scss',
})
export class UiTextareaInlineEditableComponent {
  isEnabled = input<boolean>(true);
  initialValue = input.required<string>();
  control = input.required<FormControl>();

  save = output<void>();
  cancel = output<void>();
  modeChange = output<void>();

  constructor() {
    effect(() => {
      this.control().setValue(this.initialValue());
    })
  }

  onSave(): void {
    if (this.control().invalid) {
      this.control().setValue(this.initialValue());
    } else {
      this.save.emit();
    }
  }

  onCancel(): void {
    if (this.control().invalid) {
      this.control().setValue(this.initialValue());
    }

    this.cancel.emit();
  }

  onModeChange(): void {
    this.modeChange.emit();
  }
}
