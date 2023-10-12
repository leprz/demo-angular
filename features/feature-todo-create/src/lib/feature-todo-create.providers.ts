import { EnvironmentProviders, Provider } from '@angular/core';
import { provideState } from '@ngrx/store';
import { TodoCreateEffects, todoCreateFeature } from './+store/todo-create.store';
import { provideEffects } from '@ngrx/effects';

export const featureTodoCreateProviders: Array<EnvironmentProviders | Provider> =
  [provideState(todoCreateFeature), provideEffects(TodoCreateEffects)];
