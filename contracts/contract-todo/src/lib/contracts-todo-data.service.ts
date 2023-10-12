import { Injectable } from '@angular/core';
import {
  CreateOneTodoContract,
  DeleteOneTodoContract,
  ReadManyTodosContract,
  ReadOneTodoContract,
  UpdateOneTodoContract,
  UpdateOneTodoResolutionContract,
} from './contracts-todo';
import { HttpClientFake } from './http-client.fake';
import { Observable } from 'rxjs';
import { urlFactory } from '@valueadd/typed-urls';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  constructor(private readonly httpClient: HttpClientFake) {}

  readManyTodos(): Observable<typeof ReadManyTodosContract.result> {
    return this.httpClient.get<typeof ReadManyTodosContract.result>('/todos');
  }
  deleteOneTodo(
    pathParams: typeof DeleteOneTodoContract.pathParams
  ): Observable<typeof DeleteOneTodoContract.result> {
    return this.httpClient.delete<void>(
      urlFactory(DeleteOneTodoContract.path).url(pathParams) as
        | '/todos/1'
        | '/todos/2'
        | '/todos/3'
    );
  }

  readOneById(
    pathParams: typeof ReadOneTodoContract.pathParams
  ): Observable<typeof ReadOneTodoContract.result> {
    return this.httpClient.get<typeof ReadOneTodoContract.result>(
      urlFactory(ReadOneTodoContract.path).url(pathParams) as
        | '/todos/1'
        | '/todos/2'
        | '/todos/3'
    );
  }

  updateResolution(
    pathParams: typeof UpdateOneTodoResolutionContract.pathParams,
    bodyParams: typeof UpdateOneTodoResolutionContract.bodyParams
  ): Observable<typeof UpdateOneTodoResolutionContract.result> {
    return this.httpClient.patch<typeof UpdateOneTodoResolutionContract.result>(
      urlFactory(UpdateOneTodoContract.path).url(pathParams),
      bodyParams
    );
  }

  createOne(
    bodyParams: typeof CreateOneTodoContract.bodyParams
  ): Observable<typeof CreateOneTodoContract.result> {
    return this.httpClient.post<typeof CreateOneTodoContract.result>(
      '/todos',
      bodyParams
    );
  }

  updateOne(
    pathParams: typeof UpdateOneTodoContract.pathParams,
    bodyParams: typeof UpdateOneTodoContract.bodyParams
  ): Observable<typeof UpdateOneTodoContract.result> {
    return this.httpClient.put<typeof UpdateOneTodoContract.result>(
      urlFactory(UpdateOneTodoContract.path).url(pathParams),
      bodyParams
    );
  }
}
