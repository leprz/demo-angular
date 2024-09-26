import { API } from 'rest-contracts';

export enum PermissionsKeyRequestProps {
  todos = 'todos',
}

export enum PermissionsActionRequestProps {
  view = 'view',
  read = 'read',
  write = 'write',
  delete = 'delete',
}

export const GetPermissionsContract = API.Get.Path('/permissions').Returns<{
  key: PermissionsKeyRequestProps,
  value: {
    view: boolean,
    read: boolean,
    write: boolean,
    delete: boolean,
  }
}[]>();


export type GetPermissionsResult = typeof GetPermissionsContract.result;

export class GetPermissionsResultUtils {
  static hasPermissions(
    permissions: GetPermissionsResult,
    key: PermissionsKeyRequestProps,
    action: PermissionsActionRequestProps
  ): boolean {
    return !!permissions.find(p => p.key === key && p.value[action]);
  }

  static isAllowed(
    permissions: GetPermissionsResult,
    key: PermissionsKeyRequestProps,
    action: PermissionsActionRequestProps
  ): boolean {
    return permissions.find(p => p.key === key)?.value[action] ?? false;
  }
}
