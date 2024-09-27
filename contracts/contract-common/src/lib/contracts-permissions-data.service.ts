import { Observable } from 'rxjs';
import { GetPermissionsResult } from './contracts-permissions';

export abstract class ContractsPermissionsDataService {
  abstract readManyPermissions(): Observable<GetPermissionsResult>;
}
