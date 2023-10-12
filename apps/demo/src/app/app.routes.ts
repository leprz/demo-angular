import { Route } from '@angular/router';
import {Error404Component} from "./error-404.component";

export const appRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'todo',
        pathMatch: 'full',
        loadChildren: () => import('@demo/pages/page-todo').then(m => m.pagesPageTodoRoutes),
      },
      {
        path: 'todo/:id',
        loadChildren: () => import('@demo/pages/page-todo-details').then(m => m.pagesPageTodoDetailsRoutes),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'todo',
      },
    ]
  },
  {
    path: '**',
    component: Error404Component,
  }
];
