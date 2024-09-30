import {EnvironmentProviders, Provider} from "@angular/core";
import {provideState} from "@ngrx/store";
import {TodoDetailsEffects, todoDetailsFeatureState} from "./+state/todo-details.store";
import {provideEffects} from "@ngrx/effects";
import {FeatureTodoDetails} from "./feature-todo-details";
import { FeatureTodoDetailsPolicyPort, FeatureTodoDetailsPort } from '@demo/features/feature-todo-common';
import { FeatureTodoDetailsPolicy } from './feature-todo-details.policy';

export const featureTodoDetailsProviders: Array<EnvironmentProviders | Provider> = [
  FeatureTodoDetails,
  {
    provide: FeatureTodoDetailsPolicyPort,
    useClass: FeatureTodoDetailsPolicy
  },
  {
    provide: FeatureTodoDetailsPort,
    useClass: FeatureTodoDetails,
  },
  provideState(todoDetailsFeatureState),
  provideEffects(TodoDetailsEffects)
]
