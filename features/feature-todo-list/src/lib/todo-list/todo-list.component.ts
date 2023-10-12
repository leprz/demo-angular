import {ChangeDetectionStrategy, Component, TrackByFunction,} from '@angular/core';
import {CommonModule, NgFor} from '@angular/common';
import {FeatureTodoList} from '../feature-todo-list';
import {UiTodoItem, UiTodoItemComponent} from '@demo/ui/ui-todo-item';
import {map, Observable} from 'rxjs';
import {UiLoadedContentComponent} from '@demo/ui/ui-loaded-content';
import {filterNill, HasErrorPipe, IsLoadingPipe,} from '@demo/utils/utils-data-service';
import {animate, style, transition, trigger} from '@angular/animations';
import {HttpRequestState} from 'ngx-http-request-state';
import {TodoListDeleteComponent} from "./todo-list-delete.component";
import {TodoListResolutionComponent} from "./todo-list-resolution.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'feature-todo-list',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    UiTodoItemComponent,
    UiLoadedContentComponent,
    IsLoadingPipe,
    HasErrorPipe,
    TodoListDeleteComponent,
    TodoListResolutionComponent,
  ],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('hide', [
      transition(':leave', [
        animate(
          '.3s ease-in-out',
          style({ transform: 'translateX(100%)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class TodoListComponent {
  private readonly todoList$ = this.featureTodoList.todoList$;

  readonly uiTodoList$: Observable<HttpRequestState<UiTodoItem[]>> =
    this.todoList$.pipe(
      filterNill(),
      map((todoListResponse) => ({
        ...todoListResponse,
        value: todoListResponse.value?.content.map(
          (todo): UiTodoItem => ({
            id: todo.id,
            title: todo.name,
            detailsUrl: `/todo/${todo.id}`,
            isComplete: todo.isComplete,
          })
        ),
      }))
    );

  trackByFn: TrackByFunction<UiTodoItem> = (index, item) => item.id;

  constructor(
    private readonly featureTodoList: FeatureTodoList,
  ) {
      featureTodoList.loadTodoList();

      featureTodoList.events$.pipe(
        takeUntilDestroyed(),
      ).subscribe();
  }
}
