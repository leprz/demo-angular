import type {Meta, StoryObj} from '@storybook/angular';

const meta: Meta = {
  title: 'Button',
};
export default meta;
type Story = StoryObj;

export const Button: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-direction: column; align-items: flex-start">
        <button type="button">
          Button
        </button>
        <button type="button" disabled>
          Disabled
        </button>
        <button class="btn-icon">x</button>
        <button class="btn-icon"><i class="icon-check"></i></button>
      </div>
      `,
  }),
};
