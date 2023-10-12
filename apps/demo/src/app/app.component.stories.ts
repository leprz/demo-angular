import type { Meta, StoryObj } from '@storybook/angular';
import { AppComponent } from './app.component';

const meta: Meta<AppComponent> = {
  component: AppComponent,
  title: 'App Shell',
};
export default meta;
type Story = StoryObj<AppComponent>;

export const AppShell: Story = {
  args: {},
};
