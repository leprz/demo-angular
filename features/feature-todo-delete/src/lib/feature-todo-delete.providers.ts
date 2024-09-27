import { EnvironmentProviders, Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { TODO_DELETE_FEATURE_KEY, TodoDeleteEffects, todoDeleteReducer } from './+store/todo-delete.store';
import { provideEffects } from '@ngrx/effects';
import { TodoDataService } from '@demo/contracts/contract-todo';
import { FeatureTodoDeleteImpl } from './feature-todo-delete';
import { FeatureTodoDeletePolicyPort, FeatureTodoDeletePort } from '@demo/features/feature-todo-common';
import { FeatureTodoDeletePolicy } from './feature-todo-delete.policy';
import { FeatureTodoDeletePolicyReadonly } from './feature-todo-delete.policy-readonly';

export const featureTodoDeleteProviders: Array<Provider | EnvironmentProviders> = [
  TodoDataService,
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
  TodoDataService,
  {
    provide: FeatureTodoDeletePolicyPort,
    useClass: FeatureTodoDeletePolicyReadonly
  },
  {
    provide: FeatureTodoDeletePort,
    useClass: FeatureTodoDeleteImpl,
  },
];


