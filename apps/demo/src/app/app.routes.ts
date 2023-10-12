import { Route } from '@angular/router';
import {Error404Component} from "./error-404.component";

export const appRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'todo',
        loadChildren: () => import('@demo/pages/page-todo').then(m => m.pagesPageTodoRoutes),
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
