import { EnvironmentProviders, Provider } from '@angular/core';
import { TodoEditFormBuilder } from './todo-edit.form';
import { FeatureTodoEdit } from './feature-todo-edit';
import { provideEffects } from '@ngrx/effects';
import { TODO_EDIT_FEATURE_KEY, TodoEditEffects, todoEditReducer } from './+store/todo-edit.store';
import { provideState } from '@ngrx/store';

export const featureTodoEditProviders: Array<Provider | EnvironmentProviders> = [
  TodoEditFormBuilder,
  FeatureTodoEdit,
  provideEffects(TodoEditEffects),
  provideState(TODO_EDIT_FEATURE_KEY, todoEditReducer),
];
