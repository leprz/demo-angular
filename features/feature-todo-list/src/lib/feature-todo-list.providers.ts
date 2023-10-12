import {EnvironmentProviders, Provider} from "@angular/core";
import {provideEffects} from "@ngrx/effects";
import {TodoListEffects} from "./+store/todo-list.effects";
import {TodoListFeatureState} from "./+store/todo-list.reducer";
import {provideState} from "@ngrx/store";
import {FeatureTodoList} from "./feature-todo-list";

export const featureTodoListProviders: Array<Provider | EnvironmentProviders> = [
  FeatureTodoList,
  provideEffects(TodoListEffects),
  provideState(TodoListFeatureState)
]
