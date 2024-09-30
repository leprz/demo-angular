import { Pipe, PipeTransform } from '@angular/core';
import { ReadManyTodosResult } from '@demo/contracts/contract-todo';
import { UiTodoItem } from '@demo/ui/ui-todo-item';
@Pipe({
  name: 'mapReadManyTodosResultItemToUiTodoItem',
  standalone: true,
  pure: true
})
export class MapReadManyTodosResultItemToUiTodoItemPipe implements PipeTransform {
  transform(result: ReadManyTodosResult['content'][number]): UiTodoItem {
    return {
      id: result.id,
      title: result.name,
      detailsUrl: `/todo/${result.id}`,
      isComplete: result.isComplete,
    };
  }
}
