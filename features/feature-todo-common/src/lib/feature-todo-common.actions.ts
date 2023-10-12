import {createActionGroup, props} from "@ngrx/store";
import {ActionPayload} from "@demo/utils/utils-data-service";
import {
  DeleteOneTodoContract,
  ReadManyTodosContract,
  UpdateOneTodoResolutionContract
} from "@demo/contracts/contract-todo";

export const featureTodoCommonActions = createActionGroup({
  source: 'feature todo common',
  events: {
    'todo deleted with success': props<ActionPayload<typeof DeleteOneTodoContract.pathParams>>(),
    'todo list loaded with success': props<ActionPayload<typeof ReadManyTodosContract.result>>(),
    'todo resolution updated with success': props<ActionPayload<typeof UpdateOneTodoResolutionContract.pathParams>>(),
  }
});
