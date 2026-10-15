import { SpeakerHighIcon, SpeakerLowIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Slider } from '../slider'
import { SliderGroup } from './index'

const RANGES = {
  double: [25, 75],
  single: 50,
}

export default {
  component: SliderGroup,
  parameters: {
    description: {
      component:
        'SliderGroup owns the shared value and configuration for a slider and its companions. Use SliderGroupSlider (instead of the standalone Slider) when SliderInput or SliderValue must stay in sync with the slider; SliderLabel, SliderDescription and SliderIcon provide layout and context.',
    },
    subtitle: 'Groups a slider with labels, icons, a value readout and a number input.',
  },
  title: 'Components/Slider Group',
} satisfies Meta<typeof SliderGroup>

type Story = StoryObj<typeof SliderGroup>

export const VerticalOrientation: Story = {
  render: () => (
    <SliderGroup className="h-[240px] w-fit">
      <SliderGroup.Label>Vertical Slider</SliderGroup.Label>
      <Slider
        defaultValue={50}
        min={0}
        max={100}
        step={1}
        orientation="vertical"
        className="h-[200px]"
      />
      <SliderGroup.Description>This slider is oriented vertically.</SliderGroup.Description>
    </SliderGroup>
  ),
}

/**
 * Range slider allows selection of both minimum and maximum values.
 */
export const RangeValue: Story = {
  render: () => (
    <SliderGroup className="w-[320px]">
      <SliderGroup.Label>Price Range</SliderGroup.Label>
      <Slider defaultValue={RANGES.double} min={0} max={1000} step={10} />
      <SliderGroup.Description>Select your budget range</SliderGroup.Description>
    </SliderGroup>
  ),
}

/**
 * Behavior: Slider with min/max labels visible.
 */
export const BehaviorWithLabels: Story = {
  render: () => (
    <SliderGroup className="w-[320px]">
      <SliderGroup.Label>Temperature</SliderGroup.Label>
      <Slider defaultValue={20} min={-10} max={50} step={1} />
      <SliderGroup.Description>Adjust the temperature in Celsius</SliderGroup.Description>
    </SliderGroup>
  ),
}

/**
 * Behavior: Discrete slider with larger step increments.
 */
export const BehaviorDiscreteSteps: Story = {
  render: () => (
    <SliderGroup className="w-[320px]">
      <SliderGroup.Label>Priority Level</SliderGroup.Label>
      <Slider defaultValue={5} min={1} max={10} step={1} />
      <SliderGroup.Description>Select priority from 1 to 10</SliderGroup.Description>
    </SliderGroup>
  ),
}

/**
 * Composition: Volume slider with leading and trailing speaker icons.
 */
export const CompositionVolumeControl: Story = {
  render: () => (
    <SliderGroup className="w-[200px]">
      <SliderGroup.Label>Volume</SliderGroup.Label>
      <SliderGroup.Icon>
        <SpeakerLowIcon />
      </SliderGroup.Icon>
      <Slider defaultValue={60} min={0} max={100} step={1} />
      <SliderGroup.Icon>
        <SpeakerHighIcon />
      </SliderGroup.Icon>
      <SliderGroup.Description>Adjust the volume level</SliderGroup.Description>
    </SliderGroup>
  ),
}

/**
 * Composition: Brightness and contrast adjustment sliders stacked.
 */
export const CompositionImageSettings: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-lg rounded-lg border border-surface-3 p-md">
      <h3 className="style-text-strong-1">Image Settings</h3>
      <SliderGroup>
        <SliderGroup.Label>Brightness</SliderGroup.Label>
        <Slider defaultValue={50} min={0} max={100} step={1} />
      </SliderGroup>
      <SliderGroup>
        <SliderGroup.Label>Contrast</SliderGroup.Label>
        <Slider defaultValue={50} min={0} max={100} step={1} />
      </SliderGroup>
      <SliderGroup>
        <SliderGroup.Label>Saturation</SliderGroup.Label>
        <Slider defaultValue={100} min={0} max={200} step={10} />
      </SliderGroup>
    </div>
  ),
}

export const Tones: Story = {
  render: () => (
    <div className="w-[500px] space-y-lg">
      <h3 className="style-text-strong-1">Slider Tones</h3>
      <SliderGroup>
        <SliderGroup.Label>Brand Tone</SliderGroup.Label>
        <Slider defaultValue={50} min={0} max={100} step={1} tone="brand" />
      </SliderGroup>
      <SliderGroup>
        <SliderGroup.Label>Accent Tone</SliderGroup.Label>
        <Slider defaultValue={50} min={0} max={100} step={1} tone="accent" />
      </SliderGroup>
      <SliderGroup>
        <SliderGroup.Label>Neutral Tone</SliderGroup.Label>
        <Slider defaultValue={50} min={0} max={100} step={1} tone="neutral" />
      </SliderGroup>
      <SliderGroup>
        <SliderGroup.Label>Error Tone</SliderGroup.Label>
        <Slider defaultValue={50} min={0} max={100} step={1} tone="error" />
      </SliderGroup>
      <SliderGroup>
        <SliderGroup.Label>Info Tone</SliderGroup.Label>
        <Slider defaultValue={50} min={0} max={100} step={1} tone="info" />
      </SliderGroup>
      <SliderGroup>
        <SliderGroup.Label>Success Tone</SliderGroup.Label>
        <Slider defaultValue={50} min={0} max={100} step={1} tone="success" />
      </SliderGroup>
      <SliderGroup>
        <SliderGroup.Label>Warning Tone</SliderGroup.Label>
        <Slider defaultValue={50} min={0} max={100} step={1} tone="warning" />
      </SliderGroup>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="w-[500px] space-y-lg">
      <h3 className="style-text-strong-1">Slider Sizes</h3>
      <SliderGroup>
        <SliderGroup.Label>Small Size</SliderGroup.Label>
        <Slider defaultValue={50} min={0} max={100} step={1} size="small" />
      </SliderGroup>
      <SliderGroup>
        <SliderGroup.Label>Medium Size</SliderGroup.Label>
        <Slider defaultValue={50} min={0} max={100} step={1} size="medium" />
      </SliderGroup>
      <SliderGroup>
        <SliderGroup.Label>Large Size</SliderGroup.Label>
        <Slider defaultValue={50} min={0} max={100} step={1} size="large" />
      </SliderGroup>
    </div>
  ),
}

export const HideThumb: Story = {
  render: () => (
    <SliderGroup className="w-[320px]">
      <SliderGroup.Label>Hidden Thumb</SliderGroup.Label>
      <Slider defaultValue={50} min={0} max={100} step={1} showThumbOnHover={false} />
      <SliderGroup.Description>The thumb is hidden until hover</SliderGroup.Description>
    </SliderGroup>
  ),
}

export const HideTrack: Story = {
  render: () => (
    <SliderGroup className="w-[320px]">
      <SliderGroup.Label>Hidden Track</SliderGroup.Label>
      <Slider defaultValue={50} min={0} max={100} step={1} showIndicator={false} />
      <SliderGroup.Description>The track is hidden</SliderGroup.Description>
    </SliderGroup>
  ),
}

export const ShowValue: Story = {
  render: () => (
    <SliderGroup className="w-[320px]" defaultValue={50}>
      <SliderGroup.Label>Show Value</SliderGroup.Label>
      <SliderGroup.Slider min={0} max={100} step={1} showTooltip={false} />
      <SliderGroup.Value />
      <SliderGroup.Description>The current value is displayed</SliderGroup.Description>
    </SliderGroup>
  ),
}

export const WithInput: Story = {
  render: () => (
    <SliderGroup className="w-[320px]" defaultValue={50}>
      <SliderGroup.Label>Volume</SliderGroup.Label>
      <SliderGroup.Slider min={0} max={100} step={1} />
      <SliderGroup.Input size="small" />
      <SliderGroup.Description>Drag the slider or type a value</SliderGroup.Description>
    </SliderGroup>
  ),
}

export const Everything: Story = {
  render: () => (
    <SliderGroup className="w-[320px]" defaultValue={50}>
      <SliderGroup.Label>Everything</SliderGroup.Label>
      <SliderGroup.Icon>
        <SpeakerLowIcon />
      </SliderGroup.Icon>
      <SliderGroup.Slider min={0} max={100} step={1} showTooltip={false} />
      <SliderGroup.Icon>
        <SpeakerHighIcon />
      </SliderGroup.Icon>
      <SliderGroup.Value />
      <SliderGroup.Input size="small" />
      <SliderGroup.Description>All features combined</SliderGroup.Description>
    </SliderGroup>
  ),
}
