import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'lib-feature-todo-edit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feature-todo-edit.component.html',
  styleUrl: './feature-todo-edit.component.css',
})
export class FeatureTodoEditComponent {
  formControl: FormControl = new FormControl('title');
}
