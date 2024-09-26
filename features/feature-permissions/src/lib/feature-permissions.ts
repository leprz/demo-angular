import { FeaturePermissionsPort } from '@demo/feature-common';
import { BehaviorSubject, map, Observable, Subject, switchMap } from 'rxjs';
import { GetPermissionsResult } from '@demo/contract-permissions';
import { PermissionsDataService } from './permissions-data.service';
import { HttpRequestState, loadedState } from 'ngx-http-request-state';
import { Injectable } from '@angular/core';

@Injectable()
export class FeaturePermissions extends FeaturePermissionsPort {
  constructor(private readonly dataService: PermissionsDataService) {
    super();
  }

  load$ = new BehaviorSubject<void>(undefined);

  permissions$: Observable<HttpRequestState<GetPermissionsResult | null>> = this.load$.pipe(
    switchMap(() => this.dataService.readManyPermissions()),
    map((permissions) => loadedState(permissions)),
  );

  load(): void {
    this.load$.next();
  }
}
