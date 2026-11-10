import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Checkbox } from '../../../src/components/checkbox'
import { checkboxVariants } from '../../../src/components/checkbox/checkbox.types'
import type { CheckboxRootProps } from '../../../src/components/checkbox/checkbox.types'
import { Matrix, target, text } from './figma'
import type { FigmaSpec } from './figma'

export default { title: 'Figma/Checkbox', tags: ['!dev', '!autodocs', '!test'] } satisfies Meta
type Story = StoryObj

export const Indicator: Story = {
  parameters: {
    figma: {
      component: 'Checkbox/Indicator',
      group: 'Checkbox',
      order: 630,
      states: ['Checked', 'Indeterminate'],
      defaults: { State: 'Checked' },
      description: 'Check or mixed-state glyph used inside Checkbox.',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <BaseCheckbox.Root
          checked
          indeterminate={combo.State === 'Indeterminate'}
          aria-label="Selection"
          className={checkboxVariants()}
        >
          <Checkbox.Indicator {...target(index)} />
        </BaseCheckbox.Root>
      )}
    />
  ),
}

export const Root: Story = {
  parameters: {
    figma: {
      component: 'Checkbox',
      group: 'Checkbox',
      order: 631,
      cva: { file: 'src/components/checkbox/checkbox.types.ts', name: 'checkboxVariants' },
      states: ['Default', 'Checked', 'Indeterminate', 'Disabled'],
      description: 'Labelled checkbox with a reusable Indicator. Choose state and edit the label.',
      annotate: [
        {
          selector: '[data-figma-check][data-checked] svg',
          attrs: { part: 'Checkbox/Indicator', variant: '{"State":"Checked"}' },
        },
        {
          selector: '[data-figma-check][data-indeterminate] svg',
          attrs: { part: 'Checkbox/Indicator', variant: '{"State":"Indeterminate"}' },
        },
      ],
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <div {...target(index)}>
          <Checkbox
            data-figma-check=""
            checked={combo.State === 'Checked' || combo.State === 'Indeterminate'}
            indeterminate={combo.State === 'Indeterminate'}
            disabled={combo.State === 'Disabled'}
            variant={combo.variant as CheckboxRootProps['variant']}
          >
            <span {...text('label')}>Enable notifications</span>
          </Checkbox>
        </div>
      )}
    />
  ),
}
