import { delay, Observable, of } from 'rxjs';
import {
  DeleteOneTodoContract,
  ReadManyTodosContract,
  ReadOneTodoContract,
  TodoResponseItem,
} from './contracts-todo';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

let data: typeof ReadManyTodosContract.result.content = [
  {
    name: 'Todo 1',
    id: '1',
    isComplete: false,
  },
  {
    name: 'Todo 2',
    id: '2',
    isComplete: false,
  },
];

function findById(id: string): (typeof data)[number] | undefined {
  return data.find((todo) => todo.id === id);
}

function removeById(id: string): typeof data {
  return data.filter((todo) => todo.id !== id);
}

function updateById(
  id: string,
  newValue: Partial<(typeof data)[number]>
): typeof data {
  return data.map((todo) =>
    todo.id === id
      ? {
          ...todo,
          ...newValue,
        }
      : todo
  );
}

function addToBeginning(value: TodoResponseItem): typeof data {
  return [value, ...data];
}

const notFoundError = (path: string) =>
  new HttpErrorResponse({
    status: 404,
    error: 'Not found',
    url: path,
  });

const internalServerError = (path: string) =>
  new HttpErrorResponse({
    status: 500,
    error: 'Internal server error',
    url: path,
  });

@Injectable({
  providedIn: 'root',
})
export class HttpClientFake {
  get<T>(path: '/todos' | '/todos/1' | '/todos/2' | '/todos/3'): Observable<T> {
    if (path === '/todos') {
      return of<typeof ReadManyTodosContract.result>({
        content: data,
      }).pipe(delay(100)) as Observable<T>;
    }

    if (path === '/todos/2') {
      throw internalServerError(path);
    }

    const res = findById(path.split('/')[2]);
    if (res) {
      return of<typeof ReadOneTodoContract.result>({
        content: res,
      }).pipe(delay(100)) as Observable<T>;
    }

    throw notFoundError(path);
  }

  delete<T>(path: '/todos/1' | '/todos/2' | '/todos/3'): Observable<T> {
    if (path === '/todos/1') {
      data = removeById('1');
      return of<typeof DeleteOneTodoContract.result>(undefined).pipe(
        delay(100)
      ) as Observable<T>;
    }

    if (path === '/todos/2') {
      throw notFoundError(path);
    } else {
      data = removeById(path.split('/')[2]);
      return of<typeof DeleteOneTodoContract.result>(undefined).pipe(
        delay(100)
      ) as Observable<T>;
    }
  }

  patch<T>(path: string, requestBody: { isComplete: boolean }): Observable<T> {
    if (path === '/todos/2') {
      throw new HttpErrorResponse({
        status: 500,
        error: 'Internal server error',
      });
    }
    const id = path.split('/')[2];
    const item = findById(id);
    if (item) {
      data = updateById(id, requestBody);

      return of(undefined).pipe(delay(100)) as Observable<T>;
    }

    throw notFoundError;
  }

  post<T>(path: string, bodyParams: TodoResponseItem): Observable<T> {
    if (path === '/todos') {
      data = addToBeginning(bodyParams);

      return of(undefined).pipe(delay(100)) as Observable<T>;
    }

    throw notFoundError;
  }

  put<T>(path: string, bodyParams: Partial<TodoResponseItem>): Observable<T> {
    const id = path.split('/')[2];
    const res = findById(id);
    if (res) {
      data = updateById(id, bodyParams);

      return of(undefined).pipe(delay(100)) as Observable<T>;
    }

    throw notFoundError;
  }
}
