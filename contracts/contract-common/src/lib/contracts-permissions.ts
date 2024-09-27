import { API } from 'rest-contracts';

type PermissionsValue = { [key: string]: boolean };

export type GetPermissionsResult<
  K extends string = string,
  V extends PermissionsValue = PermissionsValue,
> = Array<{ key: K; value: V }>;

export const GetPermissionsContract =
  API.Get.Path('/permissions').Returns<GetPermissionsResult>();

export class GetPermissionsResultUtils {
  static hasPermissions<K extends string, V extends PermissionsValue>(
    permissions: GetPermissionsResult<K, V>,
    key: K,
    action: keyof V,
  ): boolean {
    return !!permissions.find((p) => p.key === key && p.value[action]);
  }

  static isAllowed<K extends string, V extends PermissionsValue>(
    permissions: GetPermissionsResult<K, V>,
    key: K,
    action: keyof V,
  ): boolean {
    return permissions.find((p) => p.key === key)?.value[action] ?? false;
  }
}
