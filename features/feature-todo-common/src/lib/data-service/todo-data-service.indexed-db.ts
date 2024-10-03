import {
  CreateOneTodoBodyParams,
  CreateOneTodoResult,
  DeleteOneTodoPathParams,
  DeleteOneTodoResult,
  ReadManyTodosResult,
  ReadOneTodoPathParams,
  ReadOneTodoResult,
  TodoDataServicePort,
  UpdateOneTodoBodyParams,
  UpdateOneTodoPathParams,
  UpdateOneTodoResolutionBodyParams,
  UpdateOneTodoResolutionPathParams,
  UpdateOneTodoResult
} from '@demo/contracts/contract-todo';
import { from, map, Observable } from 'rxjs';
import { reduceUndefined, TodoDb } from './todo.indexed-db';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TodoDataServiceIndexedDb implements TodoDataServicePort {
  constructor(private readonly db: TodoDb) {
  }

  createOne(bodyParams: CreateOneTodoBodyParams): Observable<CreateOneTodoResult> {
    return fromPromise(this.db.todoItems.add(bodyParams)).pipe(map(() => undefined));
  }

  deleteOne(pathParams: DeleteOneTodoPathParams): Observable<DeleteOneTodoResult> {
    return fromPromise(this.db.todoItems.where(
      { id: pathParams.id }
    ).delete()).pipe(map((deleteCount) => {
      if (deleteCount === 0) {
        throw new Error('Not found');
      }
      return undefined;
    }));
  }

  readMany(): Observable<ReadManyTodosResult> {
    return from(this.db.todoItems.orderBy('primaryId').reverse().toArray()).pipe(map(content => ({ content })));
  }

  readOneById(pathParams: ReadOneTodoPathParams): Observable<ReadOneTodoResult> {
    return from(this.db.todoItems
      .where({ id: pathParams.id })
      .first()
    ).pipe(
      map(content => {
        if (content) {
          return { content };
        }
        throw new Error('Not found');
      })
    );
  }

  updateOne(pathParams: UpdateOneTodoPathParams, bodyParams: UpdateOneTodoBodyParams): Observable<UpdateOneTodoResult> {
    return from(
      this.db.todoItems.where({ id: pathParams.id }).modify(reduceUndefined(bodyParams))
    ).pipe(map((updateCount) => {
        if (updateCount === 0) {
          throw new Error('Not found');
        }
        return undefined;
      })
    );
  }

  updateOneResolution(
    pathParams: UpdateOneTodoResolutionPathParams,
    bodyParams: UpdateOneTodoResolutionBodyParams
  ): Observable<UpdateOneTodoResult> {
    return from(
      this.db.todoItems.where({ id: pathParams.id }).modify(bodyParams)
    ).pipe(map((updateCount) => {
        if (updateCount === 0) {
          throw new Error('Not found');
        }
        return undefined;
      })
    );
  }
}
