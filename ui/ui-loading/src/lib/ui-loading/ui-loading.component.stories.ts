import type { Meta, StoryObj } from '@storybook/angular';
import { UiLoadingComponent } from './ui-loading.component';

const meta: Meta<UiLoadingComponent> = {
  component: UiLoadingComponent,
  title: 'Loading',
};
export default meta;
type Story = StoryObj<UiLoadingComponent>;

export const Loading: Story = {
  args: {},
};
