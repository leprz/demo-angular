import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";
import {ActionPayload} from "@demo/utils/utils-data-service";
import {ReadManyTodosContract} from "@demo/contracts/contract-todo";

export const todoListActions = createActionGroup({
  source: 'todo list',
  events: {
    'todo list opened': emptyProps(),
    'todo list loaded error': props<ActionPayload<HttpErrorResponse>>(),
    'todo list loaded with success': props<ActionPayload<typeof ReadManyTodosContract.result>>(),
  }
})
