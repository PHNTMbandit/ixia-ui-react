import type { Meta, StoryObj } from '@storybook/react-vite'

import { ColorChannelSlider } from './color-channel-slider'
import {
  getHueTrack,
  getTransparencyTrack,
  getSaturationTrack,
  getLightnessTrack,
} from './color-channel-slider.utils'

export default {
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
  title: 'Components/Color Channel Slider',
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
