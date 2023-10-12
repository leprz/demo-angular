import type {Meta, StoryObj} from '@storybook/angular';
import {UiLoadedContentComponent} from './ui-loaded-content.component';

const meta: Meta<UiLoadedContentComponent> = {
  component: UiLoadedContentComponent,
  title: 'Content Loading',
};
export default meta;
type Story = StoryObj<UiLoadedContentComponent>;

export const Loaded: Story = {
  args: {
    content: {
      isLoading: false,
    }
  },
  render: (args) => ({
    props: args,
    template: `<ui-loaded-content [content]="content"><h2>Loaded content</h2></ui-loaded-content>`,
  })
};

export const Loading: Story = {
  args: {
    content: {
      isLoading: true,
    }
  }
}

export const ErrorMessage: Story = {
  args: {
    content: {
      error: new Error('Error Message'),
      isLoading: false,
    }
  }
}
