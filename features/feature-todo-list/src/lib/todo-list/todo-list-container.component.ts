import { ChangeDetectionStrategy, Component, TrackByFunction } from '@angular/core';

import { FeatureTodoList } from '../feature-todo-list';
import { UiTodoItem, UiTodoItemComponent } from '@demo/ui/ui-todo-item';
import { UiLoadedContentComponent } from '@demo/ui/ui-loaded-content';
import { HasErrorPipe, IsLoadingPipe } from '@demo/utils/utils-data-service';
import { animate, style, transition, trigger } from '@angular/animations';
import {
  FeatureTodoDeleteComponent,
  FeatureTodoDeletePolicyProviderComponent,
  FeatureTodoListComponent,
  FeatureTodoListPolicyComponent,
  FeatureTodoResolutionComponent,
  UiTodoDeleteButtonComponent
} from '@demo/features/feature-todo-common';
import { TodoListResolutionComponent } from './todo-list-resolution.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { FeaturePermissionsComponent } from '@demo/feature-common';
import { TodoListComponentMapperPipe } from './todo-list.component.mapper.pipe';

@Component({
  selector: 'feature-todo-list-container',
  standalone: true,
  imports: [
    UiTodoItemComponent,
    UiLoadedContentComponent,
    IsLoadingPipe,
    HasErrorPipe,
    UiTodoDeleteButtonComponent,
    TodoListResolutionComponent,
    AsyncPipe,
    FeatureTodoDeleteComponent,
    FeaturePermissionsComponent,
    FeatureTodoResolutionComponent,
    FeatureTodoDeletePolicyProviderComponent,
    FeatureTodoListPolicyComponent,
    FeatureTodoListComponent,
    TodoListComponentMapperPipe,
  ],
  templateUrl: './todo-list-container.component.html',
  styleUrls: ['./todo-list-container.component.scss'],
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
export class TodoListContainerComponent {
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
