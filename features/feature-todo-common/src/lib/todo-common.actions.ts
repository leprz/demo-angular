import { createActionGroup, props } from '@ngrx/store';
import { ActionPayload } from '@demo/utils/utils-data-service';
import {
  CreateOneTodoContract,
  DeleteOneTodoContract,
  ReadManyTodosContract,
  UpdateOneTodoContract,
  UpdateOneTodoResolutionContract
} from '@demo/contracts/contract-todo';

export const todoCommonActions = createActionGroup({
  source: 'todo common',
  events: {
    'todo deleted with success': props<ActionPayload<typeof DeleteOneTodoContract.pathParams>>(),
    'todo list loaded with success': props<ActionPayload<typeof ReadManyTodosContract.result>>(),
    'todo resolution updated with success': props<ActionPayload<typeof UpdateOneTodoResolutionContract.pathParams>>(),
    'todo created with success': props<ActionPayload<typeof CreateOneTodoContract.bodyParams>>(),
    'todo updated with success': props<ActionPayload<typeof UpdateOneTodoContract.pathParams>>(),
  }
});
