import {Route} from '@angular/router';
import {PageTodoDetailsComponent} from "./page-todo-details/page-todo-details.component";
import {featureTodoDetailsProviders} from "@demo/features/feature-todo-details";
import {featureTodoResolutionProviders} from "@demo/features/feature-todo-resolution";
import {featureTodoDeleteProviders} from "@demo/features/feature-todo-delete";
import { featureTodoEditProviders } from '@demo/feature-todo-edit';

export const pagesPageTodoDetailsRoutes: Route[] = [
  {
    path: '',
    providers: [
      featureTodoDetailsProviders,
      featureTodoResolutionProviders,
      featureTodoDeleteProviders,
      featureTodoEditProviders
    ],
    component: PageTodoDetailsComponent,
  }
];
