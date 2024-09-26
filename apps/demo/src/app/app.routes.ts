import { Route } from '@angular/router';
import { Error404Component } from './error-404.component';
import { featurePermissionsProviders } from '@demo/feature-permissions';
import { loadPermissionsGuard } from './load-permissions.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    providers: [...featurePermissionsProviders],
    canMatch: [loadPermissionsGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('@demo/pages/page-todo').then(m => m.pagesPageTodoRoutes),
      },
      {
        path: 'todo/:id',
        loadChildren: () => import('@demo/pages/page-todo-details').then(m => m.pagesPageTodoDetailsRoutes),
      },
    ]
  },
  {
    path: '**',
    component: Error404Component,
  }
];
