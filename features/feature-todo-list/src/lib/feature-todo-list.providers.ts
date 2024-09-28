import { EnvironmentProviders, Provider } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { TodoListEffects } from './+store/todo-list.effects';
import { TodoListFeatureState } from './+store/todo-list.reducer';
import { provideState } from '@ngrx/store';
import { FeatureTodoList } from './feature-todo-list';
import { FeatureTodoListPolicyPort, FeatureTodoListPort } from '@demo/features/feature-todo-common';
import { FeatureTodoListPolicy } from './todo-list/feature-todo-list.policy';

export const featureTodoListProviders: Array<Provider | EnvironmentProviders> = [
  FeatureTodoList,
  {
    provide: FeatureTodoListPolicyPort,
    useClass: FeatureTodoListPolicy,
  },
  {
    provide: FeatureTodoListPort,
    useClass: FeatureTodoList
  },
  provideEffects(TodoListEffects),
  provideState(TodoListFeatureState)
]
