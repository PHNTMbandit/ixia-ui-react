import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from './label'

export default {
  args: {
    htmlFor: 'example-input',
  },
  component: Label,
  parameters: {
    docs: {
      description: {
        component:
          'The Label component is used to provide descriptive text for form elements such as input fields, checkboxes, and radio buttons. It enhances accessibility by linking the label text to the corresponding form control, making it easier for users to understand the purpose of the input. This component supports various styling options to match different design requirements.',
      },
      subtitle: 'A component for displaying text labels associated with form elements.',
    },
  },
  render: (args) => <Label {...args}>Example Input</Label>,
  title: 'Components/Label',
} satisfies Meta<typeof Label>

type Story = StoryObj<typeof Label>

export const Default: Story = {}
