import type { Meta, StoryObj } from '@storybook/react-vite'
import chroma from 'chroma-js'
import { useEffect, useState } from 'react'

import { Button } from '../button'
import { Separator } from '../separator'
import { ColorPicker } from './index'

export default {
  argTypes: {
    defaultColor: {
      control: 'color',
    },
    defaultPalette: {
      control: 'object',
    },
    paletteLimit: {
      control: 'number',
    },
    variant: {
      control: 'select',
      options: ['elevated', 'outline', 'ghost'],
    },
  },
  args: {
    defaultColor: '#ff0000',
    defaultPalette: [
      '#ef4444',
      '#f97316',
      '#f59e0b',
      '#eab308',
      '#84cc16',
      '#22c55e',
      '#10b981',
      '#14b8a6',
      '#06b6d4',
      '#0ea5e9',
      '#3b82f6',
      '#6366f1',
      '#8b5cf6',
      '#a855f7',
      '#ec4899',
      '#f43f5e',
      '#64748b',
      '#6b7280',
      '#a3a3a3',
      '#d4d4d4',
      '#ffffff',
      '#0f172a',
      '#7c3aed',
      '#0891b2',
      '#16a34a',
    ],
    paletteLimit: 10,
    variant: 'elevated',
  },
  component: ColorPicker,
  title: 'Components/Color Picker',
} satisfies Meta<typeof ColorPicker>

type Story = StoryObj<typeof ColorPicker>

export const Playground: Story = {
  args: {
    paletteLimit: 26,
  },

  render: (args) => (
    <ColorPicker {...args} className="w-[400px]" onValueChange={(value) => console.log(value)}>
      <ColorPicker.Area />
      <ColorPicker.Group>
        <ColorPicker.HueSlider />
        <ColorPicker.TransparencySlider />
        <ColorPicker.LightnessSlider />
        <ColorPicker.Row>
          <ColorPicker.ValueType />
          <ColorPicker.Input />
        </ColorPicker.Row>
      </ColorPicker.Group>
      <Separator />
      <ColorPicker.Group>
        <ColorPicker.Row>
          <ColorPicker.Label>Saved</ColorPicker.Label>
          <ColorPicker.PaletteLimit />
        </ColorPicker.Row>
        <ColorPicker.PaletteList>
          <ColorPicker.PaletteAdd />
        </ColorPicker.PaletteList>
      </ColorPicker.Group>
    </ColorPicker>
  ),
}

export const Variants: Story = {
  render: (args) => (
    <div className="flex gap-md">
      <ColorPicker {...args} variant="elevated" className="w-[300px]">
        <ColorPicker.Area />
        <ColorPicker.Group>
          <ColorPicker.HueSlider />
          <ColorPicker.TransparencySlider />
          <ColorPicker.Row>
            <ColorPicker.ValueType />
            <ColorPicker.Input />
          </ColorPicker.Row>
        </ColorPicker.Group>
      </ColorPicker>
      <ColorPicker {...args} variant="outline" className="w-[300px]">
        <ColorPicker.Area />
        <ColorPicker.Group>
          <ColorPicker.HueSlider />
          <ColorPicker.TransparencySlider />
          <ColorPicker.Row>
            <ColorPicker.ValueType />
            <ColorPicker.Input />
          </ColorPicker.Row>
        </ColorPicker.Group>
      </ColorPicker>
      <ColorPicker {...args} variant="ghost" className="w-[300px]">
        <ColorPicker.Area />
        <ColorPicker.Group>
          <ColorPicker.HueSlider />
          <ColorPicker.TransparencySlider />
          <ColorPicker.Row>
            <ColorPicker.ValueType />
            <ColorPicker.Input />
          </ColorPicker.Row>
        </ColorPicker.Group>
      </ColorPicker>
    </div>
  ),
}

export const Minimal: Story = {
  render: (args) => (
    <ColorPicker {...args} className="w-[300px]">
      <ColorPicker.Group>
        <ColorPicker.HueSlider />
        <ColorPicker.TransparencySlider />
        <ColorPicker.Input showPopover>
          <ColorPicker.Area className="aspect-video" />
        </ColorPicker.Input>
      </ColorPicker.Group>
    </ColorPicker>
  ),
}

export const Controlled: Story = {
  render: function ControlledStory(args) {
    const initialColor = args.defaultColor ?? '#ff0000',
      [committedColor, setCommittedColor] = useState<string>(initialColor),
      [pendingColor, setPendingColor] = useState<string | undefined>(initialColor)

    useEffect(() => {
      setCommittedColor(initialColor)
      setPendingColor(initialColor)
    }, [initialColor])

    const handleApply = () => {
      if (!pendingColor) {
        return
      }

      setCommittedColor(pendingColor)
    }

    return (
      <div className="flex flex-col items-start gap-sm">
        <ColorPicker
          {...args}
          defaultValueType="hex"
          value={pendingColor}
          onValueChange={(value) => setPendingColor(value)}
          className="w-[600px]"
        >
          <ColorPicker.Area />
          <ColorPicker.Group>
            <ColorPicker.HueSlider />
            <ColorPicker.TransparencySlider />
            <ColorPicker.Row>
              <ColorPicker.ValueType />
              <ColorPicker.Input />
            </ColorPicker.Row>
          </ColorPicker.Group>
        </ColorPicker>
        <Button
          variant="outline"
          className="w-[300px]"
          onClick={handleApply}
          disabled={!pendingColor || pendingColor === committedColor}
        >
          Apply
        </Button>
        <div className="flex w-[300px] flex-col gap-xs">
          <code className="rounded-md bg-surface px-sm py-xs style-text-default--1 text-on-surface">
            Pending: {pendingColor ?? 'undefined'}
          </code>
          <code className="rounded-md bg-surface px-sm py-xs style-text-default--1 text-on-surface">
            Applied: {committedColor}
          </code>
        </div>
        <code className="rounded-md bg-surface px-sm py-xs style-text-default--1 text-on-surface">
          Pending CSS: {pendingColor ? chroma(pendingColor).css() : 'undefined'}
        </code>
      </div>
    )
  },
}

export const InputOnly: Story = {
  render: (args) => (
    <ColorPicker {...args} className="w-[300px]" variant="ghost">
      <ColorPicker.Input variant="primary" showPopover showTransparencyField={false}>
        <ColorPicker.Area className="aspect-video" />
        <ColorPicker.Group>
          <ColorPicker.HueSlider />
          <ColorPicker.TransparencySlider />
          <ColorPicker.Input />
        </ColorPicker.Group>
      </ColorPicker.Input>
    </ColorPicker>
  ),
}

export const ControlledPalette: Story = {
  render: function ControlledPaletteStory(args) {
    const [palette, setPalette] = useState<string[]>(['#ef4444', '#3b82f6', '#22c55e'])

    return (
      <div className="flex flex-col items-start gap-sm">
        <ColorPicker
          {...args}
          palette={palette}
          onPaletteChange={setPalette}
          paletteLimit={10}
          className="w-[300px]"
        >
          <ColorPicker.Area />
          <ColorPicker.Group>
            <ColorPicker.HueSlider />
            <ColorPicker.TransparencySlider />
            <ColorPicker.Row>
              <ColorPicker.ValueType />
              <ColorPicker.Input />
            </ColorPicker.Row>
          </ColorPicker.Group>
          <Separator />
          <ColorPicker.Group>
            <ColorPicker.Row>
              <ColorPicker.Label>Saved</ColorPicker.Label>
              <ColorPicker.PaletteLimit />
            </ColorPicker.Row>
            <ColorPicker.PaletteList>
              <ColorPicker.PaletteAdd />
            </ColorPicker.PaletteList>
          </ColorPicker.Group>
        </ColorPicker>
        <div className="flex w-[300px] gap-xs">
          <Button variant="outline" className="flex-1" onClick={() => setPalette([])}>
            Clear
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setPalette(['#ef4444', '#3b82f6', '#22c55e'])}
          >
            Reset
          </Button>
        </div>
        <code className="w-[300px] rounded-md bg-surface px-sm py-xs style-text-default--1 text-on-surface">
          {palette.join(', ') || 'empty'}
        </code>
      </div>
    )
  },
}
