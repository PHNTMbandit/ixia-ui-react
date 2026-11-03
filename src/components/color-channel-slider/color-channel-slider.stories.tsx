import type { Meta, StoryObj } from '@storybook/react-vite'

import { ColorChannelSlider } from './color-channel-slider'
import {
  getHueTrack,
  getTransparencyTrack,
  getSaturationTrack,
  getLightnessTrack,
} from './color-channel-slider.utils'

export default {
  title: 'Components/Color Channel Slider',
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
  args: {
    size: 'medium',
  },
  component: ColorChannelSlider,
  parameters: {
    docs: {
      description: {
        component:
          'The Color Channel Slider adjusts a single channel of a color, such as hue, saturation, lightness or transparency, over a track that previews the resulting colors. Track helpers generate the matching gradient for each channel. It is available in `small`, `medium` and `large` sizes and is the building block behind the Color Picker sliders.',
      },
      subtitle: 'A slider for adjusting one channel of a color.',
    },
  },
} satisfies Meta<typeof ColorChannelSlider>

type Story = StoryObj<typeof ColorChannelSlider>

export const Hue: Story = {
  name: 'Hue',
  render: (args) => (
    <ColorChannelSlider
      {...args}
      min={1}
      max={360}
      trackStyle={getHueTrack()}
      className={'w-[500px]'}
    />
  ),
}

export const Transparency: Story = {
  name: 'Transparency',
  render: (args) => (
    <ColorChannelSlider
      {...args}
      min={1}
      max={100}
      trackStyle={getTransparencyTrack('blue')}
      className={'w-[500px]'}
    />
  ),
}

export const Saturation: Story = {
  name: 'Saturation',
  render: (args) => (
    <ColorChannelSlider
      {...args}
      min={1}
      max={100}
      trackStyle={getSaturationTrack('blue')}
      className={'w-[500px]'}
    />
  ),
}

export const Lightness: Story = {
  name: 'Lightness',
  render: (args) => (
    <ColorChannelSlider
      {...args}
      min={1}
      max={100}
      trackStyle={getLightnessTrack('blue')}
      className={'w-[500px]'}
    />
  ),
}
