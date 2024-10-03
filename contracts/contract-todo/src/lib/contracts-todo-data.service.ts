import { Injectable } from '@angular/core';
import {
  CreateOneTodoBodyParams,
  CreateOneTodoContract, CreateOneTodoResult,
  DeleteOneTodoContract, DeleteOneTodoPathParams, DeleteOneTodoResult,
  ReadManyTodosContract, ReadManyTodosResult,
  ReadOneTodoContract, ReadOneTodoPathParams, ReadOneTodoResult, UpdateOneTodoBodyParams,
  UpdateOneTodoContract, UpdateOneTodoPathParams, UpdateOneTodoResolutionBodyParams,
  UpdateOneTodoResolutionContract, UpdateOneTodoResolutionPathParams, UpdateOneTodoResult
} from './contracts-todo';
import { HttpClientFake } from './http-client.fake';
import { Observable } from 'rxjs';
import { urlFactory } from '@valueadd/typed-urls';

export abstract class TodoDataServicePort {
  abstract readMany(): Observable<ReadManyTodosResult>;

  abstract deleteOne(
    pathParams: DeleteOneTodoPathParams
  ): Observable<DeleteOneTodoResult>;

  abstract readOneById(
    pathParams: ReadOneTodoPathParams
  ): Observable<ReadOneTodoResult>;

  abstract updateOneResolution(
    pathParams: UpdateOneTodoResolutionPathParams,
    bodyParams: UpdateOneTodoResolutionBodyParams
  ): Observable<UpdateOneTodoResult>;

  abstract createOne(
    bodyParams: CreateOneTodoBodyParams
  ): Observable<CreateOneTodoResult>;

  abstract updateOne(
    pathParams: UpdateOneTodoPathParams,
    bodyParams: UpdateOneTodoBodyParams
  ): Observable<UpdateOneTodoResult>;
}

@Injectable({
  providedIn: 'root',
})
export class TodoDataServiceFake implements TodoDataServicePort{
  constructor(private readonly httpClient: HttpClientFake) {}

  readMany(): Observable<typeof ReadManyTodosContract.result> {
    return this.httpClient.get<typeof ReadManyTodosContract.result>('/todos');
  }

  deleteOne(
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

  updateOneResolution(
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
