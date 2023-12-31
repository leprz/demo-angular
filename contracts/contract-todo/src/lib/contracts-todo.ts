import {API} from "rest-contracts";

export interface TodoResponseItem {
  id: string;
  name: string;
  isComplete: boolean;
}

export const ReadManyTodosContract =
  API
    .Get
    .Path('/todos')
    .Returns<{
      content: TodoResponseItem[];
    }>();

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


export const UpdateOneTodoContract =
  API
    .Put
    .Path('/todos/:id')
    .PathParameters<Pick<TodoResponseItem, 'id'>>()
    .Body<Partial<Omit<TodoResponseItem, 'id'>>>()
    .Returns<void>();

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
