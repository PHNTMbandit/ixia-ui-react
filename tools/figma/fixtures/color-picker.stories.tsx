import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

import { ColorPicker } from '../../../src/components/color-picker'
import type {
  ColorPickerProps,
  ColorPickerPaletteSwatchProps,
} from '../../../src/components/color-picker'
import { Matrix, part, slot, target, text } from './figma'
import type { Combo, FigmaSpec } from './figma'

export default { title: 'Figma/Color Picker', tags: ['!dev', '!autodocs', '!test'] } satisfies Meta
type Story = StoryObj
const cva = {
  file: 'src/components/color-picker/color-picker.types.ts',
  name: 'colorPickerVariants',
}
const context = {
  defaultColor: '#005ba7',
  defaultPalette: [],
  paletteLimit: 8,
  defaultValueType: 'hex' as const,
}
const ref = (name: string) => part(`Color Picker/${name}`, {})

function atom(
  name: string,
  order: number,
  render: (combo: Combo, index: number) => ReactNode,
  spec: Partial<FigmaSpec> = {},
): Story {
  return {
    parameters: {
      figma: {
        component: `Color Picker/${name}`,
        group: 'Color Picker',
        order,
        description: `${name} used inside ColorPicker. Color values are design examples, not a live color-calculation engine.`,
        ...spec,
      } satisfies FigmaSpec,
    },
    render: () => (
      <Matrix
        render={(combo, index) => (
          <ColorPicker {...context} variant="ghost" style={{ width: 280 }}>
            {render(combo, index)}
          </ColorPicker>
        )}
      />
    ),
  }
}

export const Area = atom('Area', 660, (_combo, index) => <ColorPicker.Area {...target(index)} />)
export const HueSlider = atom('HueSlider', 661, (_combo, index) => (
  <ColorPicker.HueSlider {...target(index)} aria-label="Hue" />
))
export const TransparencySlider = atom('TransparencySlider', 662, (_combo, index) => (
  <ColorPicker.TransparencySlider {...target(index)} aria-label="Transparency" />
))
export const LightnessSlider = atom('LightnessSlider', 663, (_combo, index) => (
  <ColorPicker.LightnessSlider {...target(index)} aria-label="Lightness" />
))
export const Input = atom(
  'Input',
  664,
  (_combo, index) => <ColorPicker.Input {...target(index)} />,
  {
    annotate: [
      { selector: '[data-figma-target] input[aria-label="Color value"]', attrs: { text: 'color' } },
      {
        selector: '[data-figma-target] input[aria-label="Transparency percentage"]',
        attrs: { text: 'alpha' },
      },
    ],
  },
)
export const ValueType = atom('ValueType', 665, (_combo, index) => (
  <ColorPicker.ValueType {...target(index)} {...text('format')} />
))
export const Label = atom('Label', 666, (_combo, index) => (
  <ColorPicker.Label {...target(index)} {...text('label')}>
    Saved colours
  </ColorPicker.Label>
))
export const PaletteLimit = atom('PaletteLimit', 667, (_combo, index) => (
  <ColorPicker.PaletteLimit {...target(index)} {...text('limit')} />
))
export const PaletteAdd = atom('PaletteAdd', 668, (_combo, index) => (
  <ColorPicker.PaletteAdd {...target(index)} />
))
export const PaletteSwatch = atom(
  'PaletteSwatch',
  669,
  (combo, index) => (
    <ColorPicker.PaletteSwatch
      {...target(index)}
      color="#005ba7"
      size={combo.size as ColorPickerPaletteSwatchProps['size']}
      aria-label="Blue"
    />
  ),
  { cva: { ...cva, name: 'colorPickerSwatchVariants' } },
)

function swatches() {
  return (
    <>
      <ColorPicker.PaletteSwatch {...ref('PaletteSwatch')} color="#005ba7" aria-label="Blue" />
      <ColorPicker.PaletteAdd {...ref('PaletteAdd')} />
    </>
  )
}

export const PaletteList = atom(
  'PaletteList',
  670,
  (_combo, index) => (
    <ColorPicker.PaletteList {...target(index)}>
      <div className="flex flex-wrap items-center gap-2xs" {...slot('swatches')}>
        {swatches()}
      </div>
    </ColorPicker.PaletteList>
  ),
  {
    slots: {
      swatches: {
        description: 'Saved swatches and add action.',
        only: true,
        preferred: ['Color Picker/PaletteSwatch', 'Color Picker/PaletteAdd'],
      },
    },
  },
)

export const Row = atom(
  'Row',
  671,
  (_combo, index) => (
    <ColorPicker.Row {...target(index)}>
      <div className="flex w-full items-center gap-xs" {...slot('content')}>
        <ColorPicker.ValueType {...ref('ValueType')} {...text('format')} />
        <ColorPicker.Input {...ref('Input')} />
      </div>
    </ColorPicker.Row>
  ),
  { slots: { content: { description: 'Any controls to arrange horizontally.' } } },
)

export const Group = atom(
  'Group',
  672,
  (_combo, index) => (
    <ColorPicker.Group {...target(index)}>
      <div className="flex w-full flex-col gap-xs" {...slot('content')}>
        <ColorPicker.HueSlider {...ref('HueSlider')} aria-label="Hue" />
        <ColorPicker.TransparencySlider {...ref('TransparencySlider')} aria-label="Transparency" />
      </div>
    </ColorPicker.Group>
  ),
  { slots: { content: { description: 'Any controls to group vertically.' } } },
)

export const Root: Story = {
  parameters: {
    figma: {
      component: 'Color Picker',
      group: 'Color Picker',
      order: 673,
      cva,
      description:
        'Recompose the color controls in content. Slots, text and swatch fills are editable; live calculations and gradient sampling remain React behavior.',
      slots: {
        content: {
          description: 'Color controls, rows, groups and palette.',
          preferred: [
            'Color Picker/Area',
            'Color Picker/Group',
            'Color Picker/Row',
            'Color Picker/PaletteList',
          ],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <ColorPicker
          {...context}
          {...target(index)}
          variant={combo.variant as ColorPickerProps['variant']}
          style={{ width: 320 }}
        >
          <div className="flex w-full flex-col gap-sm" {...slot('content')}>
            <ColorPicker.Area {...ref('Area')} />
            <ColorPicker.Group {...ref('Group')}>
              <div className="flex w-full flex-col gap-xs" {...slot('content')}>
                <ColorPicker.HueSlider {...ref('HueSlider')} aria-label="Hue" />
                <ColorPicker.TransparencySlider
                  {...ref('TransparencySlider')}
                  aria-label="Transparency"
                />
              </div>
            </ColorPicker.Group>
            <ColorPicker.Row {...ref('Row')}>
              <div className="flex w-full items-center gap-xs" {...slot('content')}>
                <ColorPicker.ValueType {...ref('ValueType')} {...text('format')} />
                <ColorPicker.Input {...ref('Input')} />
              </div>
            </ColorPicker.Row>
            <ColorPicker.PaletteList {...ref('PaletteList')}>
              <div className="flex flex-wrap items-center gap-2xs" {...slot('swatches')}>
                {swatches()}
              </div>
            </ColorPicker.PaletteList>
          </div>
        </ColorPicker>
      )}
    />
  ),
}
