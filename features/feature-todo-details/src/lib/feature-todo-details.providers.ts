import {EnvironmentProviders, Provider} from "@angular/core";
import {provideState} from "@ngrx/store";
import {TodoDetailsEffects, todoDetailsFeatureState} from "./+state/todo-details.store";
import {provideEffects} from "@ngrx/effects";
import {FeatureTodoDetails} from "./feature-todo-details";

export const featureTodoDetailsProviders: Array<EnvironmentProviders | Provider> = [
  FeatureTodoDetails,
  provideState(todoDetailsFeatureState),
  provideEffects(TodoDetailsEffects)
]
