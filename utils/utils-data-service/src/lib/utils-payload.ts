import { HttpRequestState, LoadingState } from 'ngx-http-request-state';
import {Pipe, PipeTransform} from "@angular/core";
import { HttpErrorResponse } from '@angular/common/http';

export interface ActionPayload<T> {
  payload: T
}

export const HttpRequestsStateIdle: LoadingState<undefined> = {
  value: undefined,
  error: undefined,
  isLoading: true,
};

@Pipe({
  name: 'isLoading',
  standalone: true,
  pure: true,
})
export class IsLoadingPipe implements PipeTransform {
  transform(value: HttpRequestState<unknown> | null): boolean {
    return value?.isLoading ?? false;
  }
}

@Pipe({
  name: 'hasError',
  standalone: true,
  pure: true,
})
export class HasErrorPipe implements PipeTransform {
  transform(
    value: HttpRequestState<unknown> | null
  ): value is HttpRequestState<unknown> & { error: HttpErrorResponse | Error } {
    return value?.error !== undefined;
  }
}
