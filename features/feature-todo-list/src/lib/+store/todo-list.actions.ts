import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";
import {ActionPayload} from "@demo/utils/utils-data-service";
import {ReadManyTodosContract} from "@demo/contracts/contract-todo";

export const todoListActions = createActionGroup({
  source: 'todo list',
  events: {
    'opened': emptyProps(),
    'loaded with error': props<ActionPayload<HttpErrorResponse>>(),
    'loaded with success': props<ActionPayload<typeof ReadManyTodosContract.result>>(),
    'silent reload requested': emptyProps(),
  }
})
