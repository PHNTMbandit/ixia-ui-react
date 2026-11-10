import { Slider as BaseSlider } from '@base-ui/react/slider'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Slider } from '../../../src/components/slider'
import type { SliderProps } from '../../../src/components/slider'
import { sliderVariants } from '../../../src/components/slider/slider.types'
import { Matrix, target } from './figma'
import type { FigmaSpec } from './figma'

export default { title: 'Figma/Slider', tags: ['!dev', '!autodocs', '!test'] } satisfies Meta
type Story = StoryObj
const cva = { file: 'src/components/slider/slider.types.ts', name: 'sliderVariants' }
const tones = ['brand', 'accent', 'neutral', 'error', 'info', 'success', 'warning']
const sizes = ['small', 'medium', 'large']

export const Thumb: Story = {
  parameters: {
    figma: {
      component: 'Slider/Thumb',
      group: 'Slider',
      order: 640,
      cva,
      description: 'Reusable slider handle. Size and tone come from the slider in code.',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <BaseSlider.Root
          value={50}
          className={sliderVariants({
            size: combo.size as SliderProps['size'],
            tone: combo.tone as SliderProps['tone'],
          })}
          style={{ width: 240 }}
        >
          <BaseSlider.Control className="w-full">
            <BaseSlider.Track data-slot="slider-track" className="relative w-full">
              <Slider.Thumb {...target(index)} index={0} hide aria-label="Value" />
            </BaseSlider.Track>
          </BaseSlider.Control>
        </BaseSlider.Root>
      )}
    />
  ),
}

export const Root: Story = {
  parameters: {
    figma: {
      component: 'Slider',
      group: 'Slider',
      order: 641,
      cva,
      description:
        'Slider with a reusable exposed Thumb and optional indicator. Position the handle in the track for the desired design value; live dragging is implemented by React.',
      annotate: [
        ...sizes.flatMap((size) =>
          tones.map((tone) => ({
            selector: `[data-figma-size="${size}"][data-figma-tone="${tone}"] [data-slot="slider-thumb"]`,
            attrs: {
              part: 'Slider/Thumb',
              variant: JSON.stringify({ size, tone }),
              show: 'thumb=true',
            },
          })),
        ),
        {
          selector: '[data-figma-target] [data-slot="slider-indicator"]',
          attrs: { show: 'indicator=true' },
        },
      ],
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Slider
          {...target(index)}
          data-figma-size={combo.size}
          data-figma-tone={combo.tone}
          size={combo.size as SliderProps['size']}
          tone={combo.tone as SliderProps['tone']}
          defaultValue={50}
          style={{ width: 240 }}
          showTooltip={false}
          aria-label="Value"
        />
      )}
    />
  ),
}
