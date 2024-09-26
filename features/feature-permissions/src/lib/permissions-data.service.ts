import {
  ContractsPermissionsDataService,
  GetPermissionsContractObjectMother,
  GetPermissionsResult
} from '@demo/contract-permissions';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PermissionsDataService extends ContractsPermissionsDataService {
  override readManyPermissions(): Observable<GetPermissionsResult> {
    return of(GetPermissionsContractObjectMother.allEnabled());
  }
}
