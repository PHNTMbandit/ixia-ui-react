import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../../../src/components/button'
import { Icon } from '../../../src/components/icon'
import { Matrix, swap, target, text } from './figma'
import type { Combo, FigmaSpec } from './figma'

const meta = {
  tags: ['!dev', '!autodocs', '!test'],
  title: 'Figma/Button',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const cva = {
  axes: ['tone', 'variant', 'size'],
  file: 'src/components/button/button.types.ts',
  name: 'buttonVariants',
}
const states = ['Default', 'Hover', 'Pressed', 'Disabled']
const interactive = { Hover: 'hover', Pressed: 'press' } as const
const interactions = [
  { from: { State: 'Default' }, to: { State: 'Hover' }, trigger: 'ON_HOVER' },
  { from: { State: 'Hover' }, to: { State: 'Pressed' }, trigger: 'ON_PRESS' },
] satisfies FigmaSpec['interactions']

const buttonProps = (combo: Combo) => ({
  disabled: combo.State === 'Disabled',
  size: combo.size as 'medium',
  tone: combo.tone as 'brand',
  variant: combo.variant as 'fill',
})

export const ButtonSet: Story = {
  name: 'Button',
  parameters: {
    figma: {
      component: 'Button',
      cva,
      description:
        'Buttons trigger actions. Choose tone, variant and size from the properties panel; edit the label and toggle or swap the leading and trailing icons without detaching.',
      group: 'Button',
      interactions,
      interactive,
      order: 10,
      properties: {
        label: 'children (text)',
        leadingIcon: '<Icon /> before the label',
        trailingIcon: '<Icon /> after the label',
      },
      states,
      usage:
        '<Button tone="brand" variant="fill" size="medium">\n  <Icon name="add" />\n  Create project\n</Button>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Button {...target(index)} {...buttonProps(combo)} {...text('label')}>
          <Icon name="add" {...swap('leadingIcon', false)} />
          Button
          <Icon name="chevronRight" {...swap('trailingIcon', false)} />
        </Button>
      )}
    />
  ),
}

export const IconOnly: Story = {
  name: 'Button / Icon only',
  parameters: {
    figma: {
      component: 'Button/Icon only',
      cva,
      description:
        'Square icon-only buttons. Always give them an accessible label (aria-label) in code.',
      group: 'Button',
      interactions,
      interactive,
      order: 11,
      properties: { icon: 'the single <Icon /> child' },
      states,
      usage:
        '<Button aria-label="Add" tone="neutral" variant="ghost">\n  <Icon name="add" />\n</Button>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Button {...target(index)} {...buttonProps(combo)} aria-label="Add">
          <Icon name="add" data-figma-swap="icon" />
        </Button>
      )}
    />
  ),
}
