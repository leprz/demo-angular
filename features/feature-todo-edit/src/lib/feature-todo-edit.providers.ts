import { EnvironmentProviders, Provider } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { TODO_EDIT_FEATURE_KEY, TodoEditEffects, todoEditReducer } from './+store/todo-edit.store';
import { provideState } from '@ngrx/store';
import {
  featureTodoDataServiceProviders,
  FeatureTodoEditPolicyPort,
  FeatureTodoEditPort
} from '@demo/features/feature-todo-common';
import { FeatureTodoEdit } from './feature-todo-edit';
import { FeatureTodoEditPolicy } from './feature-todo-edit.policy';

export const featureTodoEditProviders: Array<Provider | EnvironmentProviders> = [
  featureTodoDataServiceProviders,
  {
    provide: FeatureTodoEditPolicyPort,
    useClass: FeatureTodoEditPolicy,
  },
  {
    provide: FeatureTodoEditPort,
    useClass: FeatureTodoEdit
  },
  provideEffects(TodoEditEffects),
  provideState(TODO_EDIT_FEATURE_KEY, todoEditReducer),
];
