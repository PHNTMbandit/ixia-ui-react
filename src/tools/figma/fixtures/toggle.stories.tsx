import type { Meta, StoryObj } from '@storybook/react-vite'

import { Icon } from '@/components/icon'
import { Toggle } from '@/components/toggle'
import { ToggleGroup } from '@/components/toggle-group'

import { Matrix, part, slot, swap, target, text } from './figma'
import type { Combo, FigmaSpec } from './figma'

const meta = {
  tags: ['!dev', '!autodocs', '!test'],
  title: 'Figma/Toggle',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const cva = {
  axes: ['tone', 'size'],
  file: 'src/components/toggle/toggle.types.ts',
  name: 'toggleVariants',
}
const states = ['Default', 'Hover', 'Pressed', 'Disabled']
const interactions = [
  { from: { State: 'Default' }, to: { State: 'Hover' }, trigger: 'ON_HOVER' },
  { from: { State: 'Hover' }, to: { State: 'Pressed' }, trigger: 'ON_CLICK' },
  { from: { State: 'Pressed' }, to: { State: 'Default' }, trigger: 'ON_CLICK' },
] satisfies FigmaSpec['interactions']

const toggleProps = (combo: Combo) => ({
  defaultPressed: combo.State === 'Pressed',
  disabled: combo.State === 'Disabled',
  size: combo.size as 'medium',
  tone: combo.tone as 'brand',
})

export const ToggleSet: Story = {
  name: 'Toggle',
  parameters: {
    figma: {
      axes: { size: ['small', 'medium', 'large'] },
      component: 'Toggle',
      cva,
      description:
        'A two-state button. Pressed is the on state (the pressed prop). Edit the label and toggle or swap the leading icon.',
      group: 'Toggle',
      interactions,
      interactive: { Hover: 'hover' },
      order: 50,
      properties: { label: 'children (text)', leadingIcon: '<Icon /> before the label' },
      states,
      usage: '<Toggle tone="brand" size="medium">\n  <Icon name="filter" />\n  Filter\n</Toggle>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Toggle {...target(index)} {...toggleProps(combo)} {...text('label')}>
          <Icon name="filter" {...swap('leadingIcon')} />
          Toggle
        </Toggle>
      )}
    />
  ),
}

export const IconOnly: Story = {
  name: 'Toggle / Icon only',
  parameters: {
    figma: {
      axes: { size: ['iconSmall', 'iconMedium', 'iconLarge'] },
      component: 'Toggle/Icon only',
      cva,
      defaults: { size: 'iconMedium' },
      description:
        'Square icon-only toggles. Always give them an accessible label (aria-label) in code.',
      group: 'Toggle',
      interactions,
      interactive: { Hover: 'hover' },
      order: 51,
      properties: { icon: 'the single <Icon /> child' },
      states,
      usage:
        '<Toggle aria-label="Show layers" size="iconMedium">\n  <Icon name="layers" />\n</Toggle>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Toggle {...target(index)} {...toggleProps(combo)} aria-label="Toggle">
          <Icon name="layers" data-figma-swap="icon" />
        </Toggle>
      )}
    />
  ),
}

const iconSize = { large: 'iconLarge', medium: 'iconMedium', small: 'iconSmall' } as Record<
  string,
  string
>
const groupIcons = ['layers', 'filter', 'search'] as const

export const Group: Story = {
  name: 'Toggle Group',
  parameters: {
    figma: {
      component: 'Toggle Group',
      cva: {
        axes: ['variant', 'size'],
        file: 'src/components/toggle-group/toggle-group.types.ts',
        name: 'toggleGroupVariants',
      },
      description:
        'A set of related toggles. Add, remove or reorder Toggle instances in the items slot and set the pressed ones to Pressed.',
      group: 'Toggle Group',
      order: 52,
      properties: { items: '<Toggle value="…"> children' },
      slots: {
        items: {
          description: 'Toggle instances (match the group size).',
          only: true,
          preferred: ['Toggle/Icon only', 'Toggle'],
        },
      },
      usage:
        '<ToggleGroup size="medium" defaultValue={["layers"]}>\n  <Toggle value="layers" aria-label="Layers"><Icon name="layers" /></Toggle>\n  <Toggle value="filter" aria-label="Filter"><Icon name="filter" /></Toggle>\n</ToggleGroup>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <ToggleGroup
          {...target(index)}
          defaultValue={[groupIcons[0]]}
          size={combo.size as 'medium'}
          variant={combo.variant as 'default'}
        >
          <div style={{ display: 'contents' }} {...slot('items')}>
            {groupIcons.map((name, item) => (
              <Toggle
                aria-label={name}
                key={name}
                value={name}
                {...part('Toggle/Icon only', {
                  size: iconSize[combo.size],
                  State: item ? 'Default' : 'Pressed',
                  tone: 'brand',
                })}
              >
                <Icon name={name} data-figma-swap="icon" />
              </Toggle>
            ))}
          </div>
        </ToggleGroup>
      )}
    />
  ),
}
