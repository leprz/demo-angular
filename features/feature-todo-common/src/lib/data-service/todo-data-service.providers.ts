import { Provider } from '@angular/core';
import { TodoDataServicePort } from '@demo/contracts/contract-todo';
import { TodoDataServiceIndexedDb } from './todo-data-service.indexed-db';

export const featureTodoDataServiceProviders: Array<Provider> = [
  {
    provide: TodoDataServicePort,
    useClass: TodoDataServiceIndexedDb,
  },
];
