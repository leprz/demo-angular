import {EnvironmentProviders, Provider} from "@angular/core";
import {provideState} from "@ngrx/store";
import {provideEffects} from "@ngrx/effects";
import {TodoDataService} from "@demo/contracts/contract-todo";
import {FeatureTodoResolutionImpl} from "./feature-todo-resolution";
import {
  TODO_RESOLUTION_FEATURE_KEY,
  TodoResolutionEffects,
  todoResolutionReducer
} from "./+store/todo-resolution.store";
import {FeatureTodoResolutionPort} from "@demo/features/feature-todo-common";

export const featureTodoResolutionProviders: Array<Provider | EnvironmentProviders> = [
  TodoDataService,
  FeatureTodoResolutionImpl,
  {
    provide: FeatureTodoResolutionPort,
    useClass: FeatureTodoResolutionImpl,
  },
  provideEffects(TodoResolutionEffects),
  provideState(TODO_RESOLUTION_FEATURE_KEY, todoResolutionReducer),
];
