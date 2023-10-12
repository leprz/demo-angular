import {Route} from '@angular/router';
import {PageTodoComponent} from './page-todo/page-todo.component';
import {featureTodoListProviders} from "@demo/features/feature-todo-list";
export const pagesPageTodoRoutes: Route[] = [
  {
    path: '',
    providers: [
      featureTodoListProviders
    ],
    component: PageTodoComponent,
  },
];
