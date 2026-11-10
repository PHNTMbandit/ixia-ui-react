import type { Meta, StoryObj } from '@storybook/react-vite'

import { Input } from '../../../src/components/input'
import { Matrix, target, text } from './figma'
import type { FigmaSpec } from './figma'

const meta = {
  tags: ['!dev', '!autodocs', '!test'],
  title: 'Figma/Input',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const InputSet: Story = {
  name: 'Input',
  parameters: {
    figma: {
      component: 'Input',
      cva: {
        axes: ['variant', 'size'],
        file: 'src/components/input/input.types.tsx',
        name: 'inputVariants',
      },
      description:
        'A single-line text field. Edit the value text (placeholder styling by default). Use Field to add a label, description and errors.',
      group: 'Input',
      interactions: [
        { from: { State: 'Default' }, to: { State: 'Hover' }, trigger: 'ON_HOVER' },
        { from: { State: 'Hover' }, to: { State: 'Focus' }, trigger: 'ON_CLICK' },
      ],
      interactive: { Focus: 'focus', Hover: 'hover' },
      order: 80,
      properties: { value: 'placeholder or value' },
      states: ['Default', 'Hover', 'Focus', 'Invalid', 'Disabled'],
      usage: '<Input variant="primary" size="medium" placeholder="Search projects" />',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Input
          {...target(index)}
          {...text('value')}
          aria-invalid={combo.State === 'Invalid' || undefined}
          disabled={combo.State === 'Disabled'}
          placeholder="Placeholder"
          size={combo.size as 'medium'}
          style={{ width: 240 }}
          variant={combo.variant as 'primary'}
        />
      )}
    />
  ),
}
