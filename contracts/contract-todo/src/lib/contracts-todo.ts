import {API} from "rest-contracts";

export interface TodoResponseItem {
  id: string;
  name: string;
  description?: string;
  isComplete: boolean;
}

export const ReadManyTodosContract =
  API
    .Get
    .Path('/todos')
    .Returns<{
      content: TodoResponseItem[];
    }>();

export type ReadManyTodosResult = typeof ReadManyTodosContract.result;

export const ReadOneTodoContract =
  API
    .Get
    .Path('/todos/:id')
    .PathParameters<Pick<TodoResponseItem, 'id'>>()
    .Returns<{
      content: TodoResponseItem;
    }>();

export const CreateOneTodoContract =
  API
    .Post
    .Path('/todos')
    .Body<TodoResponseItem>()
    .Returns<void>();

export type CreateOneTodoBodyParams = typeof CreateOneTodoContract.bodyParams;
export type CreateOneTodoResult = typeof CreateOneTodoContract.result;

export const UpdateOneTodoContract =
  API
    .Put
    .Path('/todos/:id')
    .PathParameters<Pick<TodoResponseItem, 'id'>>()
    .Body<Partial<Omit<TodoResponseItem, 'id'| 'isComplete'>>>()
    .Returns<void>();

export type UpdateOneTodoPathParams = typeof UpdateOneTodoContract.pathParams;
export type UpdateOneTodoBodyParams = typeof UpdateOneTodoContract.bodyParams;
export type UpdateOneTodoResult = typeof UpdateOneTodoContract.result;

export const DeleteOneTodoContract =
  API
    .Delete
    .Path('/todos/:id')
    .PathParameters<Pick<TodoResponseItem, 'id'>>()
    .Returns<void>();

export const UpdateOneTodoResolutionContract =
  API
    .Patch
    .Path('/todos/:id/resolution')
    .PathParameters<Pick<TodoResponseItem, 'id'>>()
    .Body<Pick<TodoResponseItem, 'isComplete'>>()
    .Returns<void>();

export type UpdateOneTodoResolutionPathParams = typeof UpdateOneTodoResolutionContract.pathParams;
export type UpdateOneTodoResolutionBodyParams = typeof UpdateOneTodoResolutionContract.bodyParams;
export type UpdateOneTodoResolutionResult = typeof UpdateOneTodoResolutionContract.result;
