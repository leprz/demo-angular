import { Injectable } from '@angular/core';
import { Dexie, Table } from 'dexie';

export interface TodoItemEntity{
  id: string;
  name: string;
  isComplete: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoDb extends Dexie{
  readonly todoItems!: Table<TodoItemEntity, number>;
  constructor() {
    super('todo');
    this.version(1).stores({
      todoItems: '++primaryId, id, title, isComplete'
    });
  }
}

export function reduceUndefined<T extends object>(value: T): T {
  return Object.keys(value).reduce<T>((acc, key) => {
    const typedKey = key as keyof T;
    if (value[typedKey] !== undefined) {
      acc[typedKey] = value[typedKey];
    }
    return acc;
  }, {} as T);
}
