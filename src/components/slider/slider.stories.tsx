import type { Meta, StoryObj } from '@storybook/react-vite'

import { Slider } from './index'

export default {
  argTypes: {
    className: {
      table: { disable: true },
    },
    defaultValue: {
      control: false,
      description: 'Initial value(s) of the slider',
      table: {
        defaultValue: { summary: 'undefined' },
        type: { summary: 'number | number[]' },
      },
    },
    step: {
      control: { type: 'number' },
      description: 'Step increment for slider movement',
      table: {
        defaultValue: { summary: '1' },
        type: { summary: 'number' },
      },
    },
  },
  args: {
    defaultValue: 50,
    max: 100,
    min: 0,
    step: 1,
  },
  component: Slider,
  parameters: {
    description: {
      component:
        'The Slider component allows users to select a value from a continuous or discrete range by dragging a thumb along a track. It is commonly used in forms and settings where users need to adjust values such as volume, brightness, or other numerical inputs. The Slider can be customized with different sizes, tones, and step values to fit various design needs.',
    },
    subtitle: 'A component for selecting a value from a range.',
  },
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

type Story = StoryObj<typeof Slider>

export const Playground: Story = {
  render: (args) => <Slider className="w-[200px]" {...args} />,
}

/**
 * Composition: Price range selector for filtering products.
 */
export const CompositionPriceRange: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-md">
      <div>
        <h3 className="mb-xs style-text-strong-1">Filter by Price</h3>
        <p className="mb-md style-text-prose--1 text-on-surface-variant">
          Choose your ideal price range
        </p>
      </div>
      <Slider defaultValue={[250, 750]} min={0} max={1000} step={10} />
      <div className="flex justify-between text-on-surface-variant">
        <span className="style-text-default--1">Min: $250</span>
        <span className="style-text-default--1">Max: $750</span>
      </div>
    </div>
  ),
}
