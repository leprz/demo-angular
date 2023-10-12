import type {Meta, StoryObj} from '@storybook/angular';

const meta: Meta = {
  title: 'Input',
};
export default meta;
type Story = StoryObj;

export const Input: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 1rem; flex-direction: column; align-items: flex-start">
        <h2>Text input</h2>
        <input type="text" placeholder="Text input">
        <h2>Checkbox</h2>
        <input type="checkbox">
        <input type="checkbox" disabled>
      </div>
      `,
  }),
};
