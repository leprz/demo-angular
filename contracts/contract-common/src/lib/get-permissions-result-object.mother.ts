import { GetPermissionsContract } from './contracts-permissions';
import { TodoPermissionsResultKeys } from '@demo/contracts/contract-todo';

export class GetPermissionsResultObjectMother {
  static allEnabled(): typeof GetPermissionsContract.result {
    return [
      {
        key: TodoPermissionsResultKeys.todos,
        value: {
          view: true,
          read: true,
          write: true,
          delete: true,
        },
      },
    ];
  }

  static readOnly(): typeof GetPermissionsContract.result {
    return [
      {
        key: TodoPermissionsResultKeys.todos,
        value: {
          view: true,
          read: true,
          write: false,
          delete: false,
        },
      },
    ];
  }

  static writeOnly(): typeof GetPermissionsContract.result {
    return [
      {
        key: TodoPermissionsResultKeys.todos,
        value: {
          view: true,
          read: false,
          write: true,
          delete: false,
        },
      },
    ];
  }

  static deleteOnly(): typeof GetPermissionsContract.result {
    return [
      {
        key: TodoPermissionsResultKeys.todos,
        value: {
          view: true,
          read: false,
          write: false,
          delete: true,
        },
      },
    ];
  }

  static empty(): typeof GetPermissionsContract.result {
    return [];
  }

  static allDisabled(): typeof GetPermissionsContract.result {
    return [
      {
        key: TodoPermissionsResultKeys.todos,
        value: {
          view: false,
          read: false,
          write: false,
          delete: false,
        },
      },
    ];
  }
}
