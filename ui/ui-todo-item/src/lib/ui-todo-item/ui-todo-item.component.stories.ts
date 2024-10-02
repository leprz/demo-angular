import type {Meta, StoryObj} from '@storybook/angular';
import {UiTodoItemComponent} from './ui-todo-item.component';
import {UiTodoItem} from "./ui-todo-item.interface";

const meta: Meta<UiTodoItemComponent> = {
  component: UiTodoItemComponent,
  title: 'Todo/Todo Item',
};
export default meta;
type Story = StoryObj<UiTodoItemComponent>;

const todo: UiTodoItem = {
  id: 'D35',
  title: 'Do shopping',
  isComplete: false,
  detailsUrl: 'todo/D35'
};
export const Done: Story = {
  args: {
    todo: {
      ...todo,
      isComplete: true,
    }
  },
}
export const Undone: Story = {
  args: {
    todo
  },
};

export const WithPrefix: Story = {
  args: {
    todo
  },
  render: (args) => ({
    props: args,
    template: `<ui-todo-item [todo]="todo"><input todo-item-prefix type="checkbox"></ui-todo-item>`,
  })
};

export const WithSuffix: Story = {
  args: {
    todo
  },
  render: (args) => ({
    props: args,
    template: `<ui-todo-item [todo]="todo"><button todo-item-suffix class="btn-icon">X</button></ui-todo-item>`,
  })
}
