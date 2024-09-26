import { GetPermissionsContract, PermissionsKeyRequestProps } from './contracts-permissions';

export class GetPermissionsContractObjectMother {
  static default(): typeof GetPermissionsContract.result {
    return [{
      key: PermissionsKeyRequestProps.todos,
      value: {
        view: true,
        read: true,
        write: true,
        delete: true,
      },
    }];
  }

  static empty(): typeof GetPermissionsContract.result {
    return [];
  }

  static restricted(): typeof GetPermissionsContract.result {
    return [{
      key: PermissionsKeyRequestProps.todos,
      value: {
        view: false,
        read: false,
        write: false,
        delete: false,
      },
    }];
  }
}
