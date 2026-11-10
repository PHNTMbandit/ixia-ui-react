import type { Meta, StoryObj } from '@storybook/react-vite'

import { InputOTP } from '../../../src/components/input-otp'
import { Matrix, part, slot, target, text } from './figma'
import type { FigmaSpec } from './figma'

export default { title: 'Figma/Input OTP', tags: ['!dev', '!autodocs', '!test'] } satisfies Meta
type Story = StoryObj

export const Character: Story = {
  parameters: {
    figma: {
      component: 'Input OTP/Slot',
      group: 'Input OTP',
      order: 620,
      states: ['Default', 'Filled', 'Focus', 'Disabled'],
      interactive: { Focus: 'focus' },
      description: 'One passcode character. Edit Value; choose the input state.',
      properties: { value: 'InputOTP value at this character index' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <InputOTP
          length={1}
          value={combo.State === 'Filled' ? '4' : ''}
          disabled={combo.State === 'Disabled'}
        >
          <InputOTP.Slot {...target(index)} {...text('value')} aria-label="Passcode character" />
        </InputOTP>
      )}
    />
  ),
}

export const Separator: Story = {
  parameters: {
    figma: {
      component: 'Input OTP/Separator',
      group: 'Input OTP',
      order: 621,
      description: 'Separates groups of passcode characters.',
    } satisfies FigmaSpec,
  },
  render: () => <Matrix render={(_combo, index) => <InputOTP.Separator {...target(index)} />} />,
}

export const Root: Story = {
  parameters: {
    figma: {
      component: 'Input OTP',
      group: 'Input OTP',
      order: 622,
      description:
        'Add, remove or reorder character and separator instances. Match the code length prop to the number of character inputs.',
      slots: {
        items: {
          description: 'Character inputs and separators.',
          only: true,
          preferred: ['Input OTP/Slot', 'Input OTP/Separator'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <InputOTP {...target(index)} length={4} value="1234">
          <div className="flex items-center gap-2xs" {...slot('items')}>
            <InputOTP.Slot
              {...part('Input OTP/Slot', { State: 'Filled' })}
              {...text('value')}
              aria-label="Character 1"
            />
            <InputOTP.Slot
              {...part('Input OTP/Slot', { State: 'Filled' })}
              {...text('value')}
              aria-label="Character 2"
            />
            <InputOTP.Separator {...part('Input OTP/Separator', {})} />
            <InputOTP.Slot
              {...part('Input OTP/Slot', { State: 'Filled' })}
              {...text('value')}
              aria-label="Character 3"
            />
            <InputOTP.Slot
              {...part('Input OTP/Slot', { State: 'Filled' })}
              {...text('value')}
              aria-label="Character 4"
            />
          </div>
        </InputOTP>
      )}
    />
  ),
}
