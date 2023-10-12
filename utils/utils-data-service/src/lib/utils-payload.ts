import {HttpRequestState} from "ngx-http-request-state";
import {Pipe, PipeTransform} from "@angular/core";

export interface ActionPayload<T> {
  payload: T
}

export const HttpRequestsStateIdle = {
  value: undefined,
  error: undefined,
  isLoading: false,
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
  transform(value: HttpRequestState<unknown> | null): boolean {
    return value?.error !== undefined;
  }
}
