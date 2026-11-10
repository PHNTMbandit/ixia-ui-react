import type { Meta, StoryObj } from '@storybook/react-vite'

import { RadioGroup } from '../../../src/components/radio-group'
import type { RadioProps } from '../../../src/components/radio-group'
import { Matrix, part, slot, target, text } from './figma'
import type { FigmaSpec } from './figma'

export default { title: 'Figma/Radio Group', tags: ['!dev', '!autodocs', '!test'] } satisfies Meta
type Story = StoryObj

export const Radio: Story = {
  parameters: {
    figma: {
      component: 'Radio Group/Radio',
      group: 'Radio Group',
      order: 610,
      cva: { file: 'src/components/radio-group/radio-group.types.ts', name: 'radioVariants' },
      states: ['Default', 'Selected', 'Disabled'],
      description: 'One labelled radio option. Select its state independently of the group.',
      properties: { label: 'Radio children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <RadioGroup
          value={combo.State === 'Selected' ? 'option' : ''}
          disabled={combo.State === 'Disabled'}
        >
          <div {...target(index)}>
            <RadioGroup.Radio
              value="option"
              id={`radio-${index}`}
              variant={combo.variant as RadioProps['variant']}
            >
              <span {...text('label')}>Option</span>
            </RadioGroup.Radio>
          </div>
        </RadioGroup>
      )}
    />
  ),
}

export const Root: Story = {
  parameters: {
    figma: {
      component: 'Radio Group',
      group: 'Radio Group',
      order: 611,
      description: 'Add or reorder Radio instances in options. Set exactly one option to Selected.',
      slots: {
        options: { description: 'Radio options.', only: true, preferred: ['Radio Group/Radio'] },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <RadioGroup {...target(index)} defaultValue="standard" aria-label="Shipping">
          <div className="flex flex-col gap-xs" {...slot('options')}>
            {['standard', 'express'].map((value, i) => (
              <div
                key={value}
                {...part('Radio Group/Radio', { State: i ? 'Default' : 'Selected' })}
              >
                <RadioGroup.Radio id={`shipping-${index}-${value}`} value={value}>
                  <span {...text('label')}>{i ? 'Express' : 'Standard'}</span>
                </RadioGroup.Radio>
              </div>
            ))}
          </div>
        </RadioGroup>
      )}
    />
  ),
}
