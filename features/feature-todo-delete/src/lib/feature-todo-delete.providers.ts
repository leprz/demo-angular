import {EnvironmentProviders, Provider} from "@angular/core";
import {provideState} from "@ngrx/store";
import {TODO_DELETE_FEATURE_KEY, TodoDeleteEffects, todoDeleteReducer} from "./+store/todo-delete.store";
import {provideEffects} from "@ngrx/effects";
import {TodoDataService} from "@demo/contracts/contract-todo";
import {FeatureTodoDeleteImpl} from "./feature-todo-delete";
import {FeatureTodoDelete} from "@demo/features/feature-todo-common";

export const featureTodoDeleteProviders: Array<Provider | EnvironmentProviders> = [
  TodoDataService,
  FeatureTodoDeleteImpl,
  {
    provide: FeatureTodoDelete,
    useClass: FeatureTodoDeleteImpl,
  },
  provideEffects(TodoDeleteEffects),
  provideState(TODO_DELETE_FEATURE_KEY, todoDeleteReducer),
];
