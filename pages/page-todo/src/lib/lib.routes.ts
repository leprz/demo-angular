import {Route} from '@angular/router';
import {PageTodoComponent} from './page-todo/page-todo.component';
import {featureTodoListProviders} from "@demo/features/feature-todo-list";
import {featureTodoDeleteProviders} from "@demo/features/feature-todo-delete";
export const pagesPageTodoRoutes: Route[] = [
  {
    path: '',
    providers: [
      featureTodoListProviders,
      featureTodoDeleteProviders
    ],
    component: PageTodoComponent,
  },
];
