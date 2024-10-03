import { EnvironmentProviders, Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { TodoCreateEffects, todoCreateFeature } from './+store/todo-create.store';
import { provideEffects } from '@ngrx/effects';
import {
  FeatureTodoCreatePolicyPort,
  FeatureTodoCreatePort,
  featureTodoDataServiceProviders
} from '@demo/features/feature-todo-common';
import { FeatureTodoCreatePolicy } from './feature-todo-create.policy';
import { FeatureTodoCreate } from './feature-todo-create';

export const featureTodoCreateProviders: Array<EnvironmentProviders | Provider> =
  [
    featureTodoDataServiceProviders,
    {
      provide: FeatureTodoCreatePolicyPort,
      useClass: FeatureTodoCreatePolicy
    },
    {
      provide: FeatureTodoCreatePort,
      useExisting: FeatureTodoCreate
    },
    provideState(todoCreateFeature),
    provideEffects(TodoCreateEffects)
  ];
