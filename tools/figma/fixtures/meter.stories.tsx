import type { Meta, StoryObj } from '@storybook/react-vite'

import { Icon } from '../../../src/components/icon'
import { Meter } from '../../../src/components/meter'
import { Matrix, part, show, slot, swap, target, text } from './figma'
import type { Combo, FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Meter' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
const base = { group: 'Meter' }
const cva = { file: 'src/components/meter/meter.types.ts', name: 'meterVariants' }
const value = (combo: Combo) => Number(combo.value ?? 50)
const track = (combo: Combo) => ({
  size: combo.size ?? 'medium',
  tone: combo.tone ?? 'brand',
  value: combo.value ?? '50',
})

export const Label: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Meter/Label',
      order: 470,
      description: 'Accessible meter label with an optional icon.',
      properties: { label: 'children', icon: '<Icon />' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Meter value={50}>
          <Meter.Label {...target(index)} {...text('label')}>
            <Icon aria-hidden="true" name="layers" {...swap('icon', false)} />
            Storage used
          </Meter.Label>
        </Meter>
      )}
    />
  ),
}
export const Value: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Meter/Value',
      order: 471,
      description:
        'Formatted value from Meter.value; edit the display text independently in Figma.',
      properties: { value: '<Meter value> and format' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Meter aria-label="Storage used" value={50}>
          <Meter.Value {...target(index)} {...text('value')} />
        </Meter>
      )}
    />
  ),
}
export const Subtitle: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Meter/Subtitle',
      order: 472,
      description: 'Supporting meter description.',
      properties: { subtitle: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Meter.Subtitle {...target(index)} {...text('subtitle')}>
          50 GB of 100 GB
        </Meter.Subtitle>
      )}
    />
  ),
}
export const Indicator: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Meter/Indicator',
      order: 473,
      cva: { ...cva, axes: ['size', 'tone'] },
      description: 'Filled meter segment. Its enclosing Track controls the value-dependent width.',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Meter
          aria-label="Storage used"
          value={100}
          size={combo.size as 'medium'}
          tone={combo.tone as 'brand'}
          style={{ width: 160 }}
        >
          <Meter.Track>
            <Meter.Indicator {...target(index)} />
          </Meter.Track>
        </Meter>
      )}
    />
  ),
}
export const Track: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Meter/Track',
      order: 474,
      cva: { ...cva, axes: ['size', 'tone'] },
      axes: { value: ['25', '50', '100'] },
      defaults: { value: '50' },
      description:
        'Meter track and reusable Indicator. value is the percentage of the sample 0–100 range.',
      slots: {
        indicator: { description: 'Filled segment.', preferred: ['Meter/Indicator'], max: 1 },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Meter
          aria-label="Storage used"
          value={value(combo)}
          size={combo.size as 'medium'}
          tone={combo.tone as 'brand'}
          style={{ width: 320 }}
        >
          <div {...target(index)}>
            <Meter.Track {...slot('indicator')}>
              <Meter.Indicator
                {...part('Meter/Indicator', { size: combo.size, tone: combo.tone })}
              />
            </Meter.Track>
          </div>
        </Meter>
      )}
    />
  ),
}
export const Header: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Meter/Header',
      order: 475,
      description: 'Label and value aligned at opposite ends.',
      slots: {
        content: { description: 'Header content.', preferred: ['Meter/Label', 'Meter/Value'] },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Meter aria-label="Storage used" value={50} style={{ width: 320 }}>
          <Meter.Header {...target(index)}>
            <div style={{ display: 'contents' }} {...slot('content')}>
              <Meter.Label {...part('Meter/Label', {})} {...text('label')}>
                Storage used
              </Meter.Label>
              <Meter.Value {...part('Meter/Value', {})} {...text('value')} />
            </div>
          </Meter.Header>
        </Meter>
      )}
    />
  ),
}
export const Footer: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Meter/Footer',
      order: 476,
      description: 'Supporting content and value row.',
      slots: {
        content: { description: 'Footer content.', preferred: ['Meter/Subtitle', 'Meter/Value'] },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Meter aria-label="Storage used" value={50} style={{ width: 320 }}>
          <Meter.Footer {...target(index)}>
            <div style={{ display: 'contents' }} {...slot('content')}>
              <Meter.Subtitle {...part('Meter/Subtitle', {})} {...text('subtitle')}>
                50 GB of 100 GB
              </Meter.Subtitle>
              <Meter.Value {...part('Meter/Value', {})} {...text('value')} />
            </div>
          </Meter.Footer>
        </Meter>
      )}
    />
  ),
}
export const Root: Story = {
  name: 'Meter',
  parameters: {
    figma: {
      ...base,
      component: 'Meter',
      order: 477,
      cva: { ...cva, axes: ['orientation', 'size', 'tone'] },
      axes: { value: ['25', '50', '100'] },
      defaults: { value: '50' },
      description:
        'Accessible bounded measurement composed of label, track, indicator and supporting content.',
      slots: {
        sections: {
          description: 'Meter sections.',
          preferred: ['Meter/Header', 'Meter/Track', 'Meter/Footer', 'Meter/Label', 'Meter/Value'],
        },
      },
      usage:
        '<Meter value={50}><Meter.Header><Meter.Label>Storage used</Meter.Label><Meter.Value /></Meter.Header><Meter.Track><Meter.Indicator /></Meter.Track><Meter.Footer><Meter.Subtitle>50 GB of 100 GB</Meter.Subtitle></Meter.Footer></Meter>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <div {...target(index)} style={{ width: 400 }}>
          <Meter
            {...slot('sections')}
            aria-label="Storage used"
            value={value(combo)}
            orientation={combo.orientation as 'vertical'}
            size={combo.size as 'medium'}
            tone={combo.tone as 'brand'}
            style={{ width: '100%' }}
          >
            <Meter.Header {...part('Meter/Header', {})} {...show('showHeader')}>
              <div style={{ display: 'contents' }} {...slot('content')}>
                <Meter.Label {...part('Meter/Label', {})} {...text('label')}>
                  Storage used
                </Meter.Label>
                <Meter.Value {...part('Meter/Value', {})} {...text('value')} />
              </div>
            </Meter.Header>
            <div style={{ width: '100%' }} {...part('Meter/Track', track(combo))}>
              <Meter.Track {...slot('indicator')}>
                <Meter.Indicator
                  {...part('Meter/Indicator', { size: combo.size, tone: combo.tone })}
                />
              </Meter.Track>
            </div>
            <Meter.Footer {...part('Meter/Footer', {})} {...show('showFooter')}>
              <div style={{ display: 'contents' }} {...slot('content')}>
                <Meter.Subtitle {...part('Meter/Subtitle', {})} {...text('subtitle')}>
                  {value(combo)} GB of 100 GB
                </Meter.Subtitle>
              </div>
            </Meter.Footer>
          </Meter>
        </div>
      )}
    />
  ),
}
