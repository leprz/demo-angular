import { EnvironmentProviders, Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { FeatureTodoResolution } from './feature-todo-resolution';
import {
  TODO_RESOLUTION_FEATURE_KEY,
  TodoResolutionEffects,
  todoResolutionReducer
} from './+store/todo-resolution.store';
import {
  featureTodoDataServiceProviders,
  FeatureTodoResolutionPolicyPort,
  FeatureTodoResolutionPort
} from '@demo/features/feature-todo-common';
import { FeatureTodoResolutionPolicy } from './feature-todo-resolution.policy';

export const featureTodoResolutionProviders: Array<Provider | EnvironmentProviders> = [
  featureTodoDataServiceProviders,
  {
    provide: FeatureTodoResolutionPolicyPort,
    useClass: FeatureTodoResolutionPolicy,
  },
  {
    provide: FeatureTodoResolutionPort,
    useClass: FeatureTodoResolution,
  },
  provideEffects(TodoResolutionEffects),
  provideState(TODO_RESOLUTION_FEATURE_KEY, todoResolutionReducer),
];
