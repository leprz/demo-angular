import { GetPermissionsContract, PermissionsKeyRequestProps } from './contracts-permissions';

export class GetPermissionsContractObjectMother {
  static allEnabled(): typeof GetPermissionsContract.result {
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

  static readOnly(): typeof GetPermissionsContract.result {
    return [{
      key: PermissionsKeyRequestProps.todos,
      value: {
        view: true,
        read: true,
        write: false,
        delete: false,
      },
    }];
  }

  static writeOnly(): typeof GetPermissionsContract.result {
    return [{
      key: PermissionsKeyRequestProps.todos,
      value: {
        view: true,
        read: false,
        write: true,
        delete: false,
      },
    }];
  }

  static deleteOnly(): typeof GetPermissionsContract.result {
    return [{
      key: PermissionsKeyRequestProps.todos,
      value: {
        view: true,
        read: false,
        write: false,
        delete: true,
      },
    }];
  }

  static empty(): typeof GetPermissionsContract.result {
    return [];
  }

  static allDisabled(): typeof GetPermissionsContract.result {
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
