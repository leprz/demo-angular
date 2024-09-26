import { Component, input, output } from '@angular/core';
import { FeatureTodoDeleteResult } from '../feature-todo-delete.port';
import { HasErrorPipe, IsLoadingPipe } from '@demo/utils/utils-data-service';

@Component({
  selector: 'feature-ui-todo-delete-button',
  template: `
    <span
      class="todo-list-delete"
    >
        @if (deleteResult(); as deleteResult) {
          @if (deleteResult.data | hasError) {
            <span [title]="deleteResult.data.error.message"
                  class="warning icon-exclamation"></span>
          }
          <button
            class="btn-icon"
            [disabled]="isDisabled()"
            (click)="onDeleteButtonClick()">
            <i class="icon-remove"></i>
          </button>
        }
      </span>
  `,
  styles: [`
    .todo-list-delete {
      display: flex;
      align-items: center;
    }
  `],
  standalone: true,
  imports: [
    HasErrorPipe,
    IsLoadingPipe
  ]
})
export class UiTodoDeleteButtonComponent {
  deleteResult = input.required<{data: FeatureTodoDeleteResult | null} | null>();
  isDisabled = input<boolean>(false);
  deleteClicked = output();

  onDeleteButtonClick(): void {
    this.deleteClicked.emit();
  }
}
