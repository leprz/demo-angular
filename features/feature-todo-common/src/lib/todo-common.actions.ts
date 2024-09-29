import { createActionGroup, props } from '@ngrx/store';
import { ActionPayload } from '@demo/utils/utils-data-service';
import {
  CreateOneTodoBodyParams,
  DeleteOneTodoContract,
  ReadManyTodosResult,
  UpdateOneTodoPathParams,
  UpdateOneTodoResolutionPathParams
} from '@demo/contracts/contract-todo';

export const todoCommonActions = createActionGroup({
  source: 'todo common',
  events: {
    'todo deleted with success': props<ActionPayload<typeof DeleteOneTodoContract.pathParams>>(),
    'todo list loaded with success': props<ActionPayload<ReadManyTodosResult>>(),
    'todo resolution updated with success': props<ActionPayload<UpdateOneTodoResolutionPathParams>>(),
    'todo created with success': props<ActionPayload<CreateOneTodoBodyParams>>(),
    'todo updated with success': props<ActionPayload<UpdateOneTodoPathParams>>(),
  }
});
