import { HttpErrorResponse } from '@angular/common/http';

export interface UiLoadedContent {
  readonly isLoading: boolean;
  readonly error?: HttpErrorResponse | Error;
}
