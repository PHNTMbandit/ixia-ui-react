import type { Meta, StoryObj } from '@storybook/react-vite'

import { Icon } from '../../../src/components/icon'
import { InputGroup } from '../../../src/components/input-group'
import { Kbd } from '../../../src/components/kbd'
import { Matrix, part, show, slot, swap, target, text } from './figma'
import type { FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Input Group' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
const base = { group: 'Input Group' }
const cva = {
  file: 'src/components/input/input.types.tsx',
  name: 'inputVariants',
  axes: ['size', 'variant'],
}
const states = ['Default', 'Invalid', 'Disabled']

export const Addon: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Input Group/Addon',
      order: 460,
      states: ['Default', 'Invalid'],
      description: 'Leading or trailing content with size inherited explicitly from InputGroup.',
      cva: {
        axes: ['size'],
        file: 'src/components/input-group/input-group.types.ts',
        name: 'inputGroupAddonVariants',
      },
      slots: {
        content: {
          description: 'Text, icons, Kbd or controls.',
          preferred: ['Kbd', 'Button'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <InputGroup
          size={combo.size as 'medium'}
          aria-invalid={combo.State === 'Invalid' || undefined}
        >
          <InputGroup.Addon {...target(index)} size={combo.size as 'medium'}>
            <div style={{ display: 'contents' }} {...slot('content')}>
              <Icon aria-hidden="true" name="search" {...swap('icon')} />
              <span {...show('showLabel', false)} {...text('label')}>
                Search
              </span>
            </div>
          </InputGroup.Addon>
        </InputGroup>
      )}
    />
  ),
}
export const Input: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Input Group/Input',
      order: 461,
      description:
        'Unframed input, not the separately styled Input component; the surrounding InputGroup provides its typography and field chrome.',
      cva: { ...cva, axes: ['size'] },
      states,
      properties: { value: 'placeholder / value', State: 'aria-invalid / disabled' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <InputGroup
          size={combo.size as 'medium'}
          style={{ width: 240 }}
          aria-invalid={combo.State === 'Invalid' || undefined}
        >
          <InputGroup.Input
            {...target(index)}
            {...text('value')}
            aria-label="Search projects"
            aria-invalid={combo.State === 'Invalid' || undefined}
            disabled={combo.State === 'Disabled'}
            placeholder="Search projects"
            size={combo.size as 'medium'}
          />
        </InputGroup>
      )}
    />
  ),
}
export const ColorInput: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Input Group/Input Color',
      order: 462,
      description:
        'The native type=color branch of InputGroup.Input, including its color swatch and formatted value.',
      cva: { ...cva, axes: ['size'] },
      states: ['Default', 'Disabled'],
      annotate: [{ selector: '[data-fixture-color] p', attrs: { text: 'value' } }],
      properties: { value: '<InputGroup.Input type="color" value>' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <InputGroup data-fixture-color="" size={combo.size as 'medium'} style={{ width: 240 }}>
          <InputGroup.Input
            ref={(node) =>
              node?.closest('button')?.setAttribute('data-figma-target', String(index))
            }
            type="color"
            defaultValue="#2563eb"
            size={combo.size as 'medium'}
            disabled={combo.State === 'Disabled'}
          />
        </InputGroup>
      )}
    />
  ),
}
export const Separator: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Input Group/Separator',
      order: 463,
      description: 'Vertical divider sized relative to its InputGroup.',
      cva: { ...cva, axes: ['size'] },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <InputGroup size={combo.size as 'medium'} style={{ width: 80 }}>
          <InputGroup.Separator {...target(index)} orientation="vertical" />
        </InputGroup>
      )}
    />
  ),
}
export const Root: Story = {
  name: 'Input Group',
  parameters: {
    figma: {
      ...base,
      component: 'Input Group',
      order: 464,
      cva,
      states,
      description:
        'Input shell with a flexible ordered collection of Addon, Input and Separator instances.',
      slots: {
        controls: {
          description: 'Ordered field parts.',
          preferred: [
            'Input Group/Addon',
            'Input Group/Input',
            'Input Group/Input Color',
            'Input Group/Separator',
            'Button',
          ],
        },
      },
      usage:
        '<InputGroup><InputGroup.Addon><Icon name="search" /></InputGroup.Addon><InputGroup.Input aria-label="Search projects" /><InputGroup.Separator orientation="vertical" /><InputGroup.Addon><Kbd>⌘ K</Kbd></InputGroup.Addon></InputGroup>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <InputGroup
          {...target(index)}
          style={{ width: 320 }}
          size={combo.size as 'medium'}
          variant={combo.variant as 'primary'}
          aria-invalid={combo.State === 'Invalid' || undefined}
          data-disabled={combo.State === 'Disabled'}
        >
          <div style={{ display: 'contents' }} {...slot('controls')}>
            <InputGroup.Addon
              size={combo.size as 'medium'}
              {...part('Input Group/Addon', {
                size: combo.size,
                State: combo.State === 'Invalid' ? 'Invalid' : 'Default',
              })}
            >
              <div style={{ display: 'contents' }} {...slot('content')}>
                <Icon aria-hidden="true" name="search" {...swap('icon')} />
              </div>
            </InputGroup.Addon>
            <InputGroup.Input
              {...part('Input Group/Input', { size: combo.size, State: combo.State })}
              {...text('value')}
              size={combo.size as 'medium'}
              aria-label="Search projects"
              aria-invalid={combo.State === 'Invalid' || undefined}
              disabled={combo.State === 'Disabled'}
              placeholder="Search projects"
            />
            <InputGroup.Separator
              orientation="vertical"
              {...part('Input Group/Separator', { size: combo.size })}
              {...show('showSeparator')}
            />
            <InputGroup.Addon
              size={combo.size as 'medium'}
              {...part('Input Group/Addon', {
                size: combo.size,
                State: combo.State === 'Invalid' ? 'Invalid' : 'Default',
              })}
              {...show('showTrailingAddon')}
            >
              <div style={{ display: 'contents' }} {...slot('content')}>
                <Kbd {...part('Kbd', {})} {...text('label')}>
                  ⌘ K
                </Kbd>
              </div>
            </InputGroup.Addon>
          </div>
        </InputGroup>
      )}
    />
  ),
}
