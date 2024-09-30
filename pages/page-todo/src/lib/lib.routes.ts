import { Route } from '@angular/router';
import { PageTodoComponent } from './page-todo/page-todo.component';
import { featureTodoListProviders } from '@demo/features/feature-todo-list';
import { featureTodoDeleteProviders } from '@demo/features/feature-todo-delete';
import { featureTodoResolutionProviders } from '@demo/features/feature-todo-resolution';
import { featureTodoCreateProviders } from '@demo/features/feature-todo-create';

export const pagesPageTodoRoutes: Route[] = [
  {
    path: '',
    providers: [
      featureTodoListProviders,
      featureTodoDeleteProviders,
      featureTodoResolutionProviders,
      featureTodoCreateProviders,
    ],
    component: PageTodoComponent,
  },
];
