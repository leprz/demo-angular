import {
  ContractsPermissionsDataService,
  GetPermissionsResult,
  GetPermissionsResultObjectMother
} from '@demo/contracts/contract-common';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PermissionsDataService extends ContractsPermissionsDataService {
  override readManyPermissions(): Observable<GetPermissionsResult> {
    return of(GetPermissionsResultObjectMother.allEnabled());
  }
}
