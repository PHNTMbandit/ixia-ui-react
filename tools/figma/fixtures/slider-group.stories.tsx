import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

import { Icon } from '../../../src/components/icon'
import { SliderGroup } from '../../../src/components/slider-group'
import { Matrix, part, slot, swap, target, text } from './figma'
import type { FigmaSpec } from './figma'

export default { title: 'Figma/Slider Group', tags: ['!dev', '!autodocs', '!test'] } satisfies Meta
type Story = StoryObj

function atom(name: string, order: number, render: (index: number) => ReactNode): Story {
  return {
    parameters: {
      figma: {
        component: `Slider Group/${name}`,
        group: 'Slider Group',
        order,
        description: `${name} for a Slider Group. Edit its exposed properties independently.`,
      } satisfies FigmaSpec,
    },
    render: () => (
      <Matrix
        render={(_combo, index) => (
          <SliderGroup defaultValue={50} style={{ width: 320 }}>
            {render(index)}
          </SliderGroup>
        )}
      />
    ),
  }
}

export const Label = atom('Label', 650, (index) => (
  <SliderGroup.Label {...target(index)} {...text('label')}>
    Volume
  </SliderGroup.Label>
))
export const Description = atom('Description', 651, (index) => (
  <SliderGroup.Description {...target(index)} {...text('description')}>
    Adjust the volume.
  </SliderGroup.Description>
))
export const Value = atom('Value', 652, (index) => (
  <SliderGroup.Value {...target(index)} {...text('value')} />
))
export const Input = atom('Input', 653, (index) => (
  <SliderGroup.Input {...target(index)} {...text('value')} aria-label="Volume" />
))
export const LeadingIcon = atom('Icon', 654, (index) => (
  <SliderGroup.Icon {...target(index)}>
    <Icon name="info" {...swap('icon')} />
  </SliderGroup.Icon>
))
export const Control = atom('Slider', 655, (index) => (
  <div {...target(index)} className="w-full">
    <SliderGroup.Slider
      {...part('Slider', {})}
      showTooltip={false}
      aria-label="Volume"
      style={{ width: 240 }}
    />
  </div>
))

export const Root: Story = {
  parameters: {
    figma: {
      component: 'Slider Group',
      group: 'Slider Group',
      order: 656,
      description:
        'Compose labels, slider, number input, icons and value readouts. The code group owns their shared value; Figma values are editable presentation properties.',
      slots: {
        content: {
          description: 'Slider and its companion parts.',
          only: true,
          preferred: [
            'Slider Group/Label',
            'Slider Group/Description',
            'Slider Group/Value',
            'Slider Group/Input',
            'Slider Group/Icon',
            'Slider Group/Slider',
          ],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <SliderGroup {...target(index)} defaultValue={50} style={{ width: 320 }}>
          <div className="flex w-full flex-col gap-xs" {...slot('content')}>
            <SliderGroup.Label {...part('Slider Group/Label', {})} {...text('label')}>
              Volume
            </SliderGroup.Label>
            <div {...part('Slider Group/Slider', {})}>
              <SliderGroup.Slider
                {...part('Slider', {})}
                showTooltip={false}
                aria-label="Volume"
                style={{ width: 240 }}
              />
            </div>
            <SliderGroup.Input
              {...part('Slider Group/Input', {})}
              {...text('value')}
              aria-label="Volume"
            />
            <SliderGroup.Description
              {...part('Slider Group/Description', {})}
              {...text('description')}
            >
              Adjust the volume.
            </SliderGroup.Description>
          </div>
        </SliderGroup>
      )}
    />
  ),
}
