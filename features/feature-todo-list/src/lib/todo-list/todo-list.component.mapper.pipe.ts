import { Pipe, PipeTransform } from '@angular/core';
import { ReadManyTodosResult } from '@demo/contracts/contract-todo';
import { UiTodoItem } from '@demo/ui/ui-todo-item';
@Pipe({
  name: 'mapTodoListToUi',
  standalone: true,
  pure: true
})
export class TodoListComponentMapperPipe implements PipeTransform {
  transform(result: ReadManyTodosResult | undefined): UiTodoItem[] {
    if (!result?.content) {
      return [];
    }

    return result.content.map(
      (todo): UiTodoItem => ({
        id: todo.id,
        title: todo.name,
        detailsUrl: `/todo/${todo.id}`,
        isComplete: todo.isComplete,
      })
    );
  }
}
