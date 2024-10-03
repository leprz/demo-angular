import { EnvironmentProviders, Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { TODO_DELETE_FEATURE_KEY, TodoDeleteEffects, todoDeleteReducer } from './+store/todo-delete.store';
import { provideEffects } from '@ngrx/effects';
import { FeatureTodoDeleteImpl } from './feature-todo-delete';
import {
  featureTodoDataServiceProviders,
  FeatureTodoDeletePolicyPort,
  FeatureTodoDeletePort
} from '@demo/features/feature-todo-common';
import { FeatureTodoDeletePolicy } from './feature-todo-delete.policy';
import { FeatureTodoDeletePolicyReadonly } from './feature-todo-delete.policy-readonly';

export const featureTodoDeleteProviders: Array<Provider | EnvironmentProviders> = [
  {
    provide: FeatureTodoDeletePolicyPort,
    useClass: FeatureTodoDeletePolicy
  },
  {
    provide: FeatureTodoDeletePort,
    useClass: FeatureTodoDeleteImpl,
  },
  FeatureTodoDeleteImpl,
  provideEffects(TodoDeleteEffects),
  provideState(TODO_DELETE_FEATURE_KEY, todoDeleteReducer),
];

export const featureTodoDeleteReadonlyProviders: Array<Provider | EnvironmentProviders> = [
  featureTodoDataServiceProviders,
  {
    provide: FeatureTodoDeletePolicyPort,
    useClass: FeatureTodoDeletePolicyReadonly
  },
  {
    provide: FeatureTodoDeletePort,
    useClass: FeatureTodoDeleteImpl,
  },
];


