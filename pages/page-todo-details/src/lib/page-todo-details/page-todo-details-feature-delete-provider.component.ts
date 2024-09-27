import { Component } from '@angular/core';
import { FeatureTodoDeletePolicyPort } from '@demo/features/feature-todo-common';
import { FeatureTodoDeletePolicyReadonly } from '@demo/features/feature-todo-delete';

@Component({
  selector: 'page-todo-details-feature-delete-provider',
  standalone: true,
  template: `<ng-content></ng-content>`,
  providers: [
    {
      provide: FeatureTodoDeletePolicyPort,
      useClass: FeatureTodoDeletePolicyReadonly
    }
  ]
})
export class PageTodoDetailsFeatureDeleteProviderComponent {

}
