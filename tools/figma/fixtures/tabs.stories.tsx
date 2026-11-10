import type { Meta, StoryObj } from '@storybook/react-vite'

import { Icon } from '../../../src/components/icon'
import { Tabs } from '../../../src/components/tabs'
import { Matrix, part, slot, swap, target, text } from './figma'
import type { FigmaSpec } from './figma'

const meta = {
  tags: ['!dev', '!autodocs', '!test'],
  title: 'Figma/Tabs',
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const cva = { file: 'src/components/tabs/tabs.types.ts', name: 'tabsVariants' }

function TabContent({ label }: { label: string }) {
  return (
    <>
      <Icon name="folder" {...swap('leadingIcon', false)} />
      {label}
      <Icon name="chevronDown" {...swap('trailingIcon', false)} />
    </>
  )
}

export const Tab: Story = {
  name: 'Tabs / Tab',
  parameters: {
    figma: {
      // The active background is a sibling indicator in code; it is adopted into the tab.
      adopt: '[role=presentation]',
      component: 'Tabs/Tab',
      cva: { ...cva, axes: ['variant', 'tone', 'size'] },
      description:
        'A single tab. Set variant, tone and size to match the Tabs it sits in; edit the label and toggle or swap the leading and trailing icons.',
      group: 'Tabs',
      interactions: [
        { from: { State: 'Default' }, to: { State: 'Hover' }, trigger: 'ON_HOVER' },
        { from: { State: 'Hover' }, to: { State: 'Active' }, trigger: 'ON_CLICK' },
      ],
      interactive: { Hover: 'hover' },
      order: 40,
      properties: {
        label: '<Tabs.Tab> children (text)',
        leadingIcon: '<Icon /> before the label',
        trailingIcon: '<Icon /> after the label',
      },
      states: ['Default', 'Hover', 'Active'],
      usage: '<Tabs.Tab value="overview">Overview</Tabs.Tab>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Tabs
          defaultValue={combo.State === 'Active' ? 'a' : 'b'}
          size={combo.size as 'medium'}
          tone={combo.tone as 'brand'}
          variant={combo.variant as 'default'}
        >
          <Tabs.List>
            <Tabs.Tab value="a" {...target(index)} {...text('label')}>
              <TabContent label="Tab" />
            </Tabs.Tab>
            <Tabs.Tab value="b">Other</Tabs.Tab>
          </Tabs.List>
        </Tabs>
      )}
    />
  ),
}

const labels = ['Overview', 'Activity', 'Settings']

export const TabsSet: Story = {
  name: 'Tabs',
  parameters: {
    figma: {
      // Each Tabs/Tab instance draws its own indicator.
      annotate: [{ attrs: { ignore: '' }, selector: '[role=presentation]' }],
      component: 'Tabs',
      cva: { ...cva, axes: ['variant', 'size'] },
      description:
        'A tab list with a content panel. Put Tabs/Tab instances in the tabs slot (set one to Active) and any layers in the content slot.',
      group: 'Tabs',
      order: 41,
      properties: {
        content: '<Tabs.Panel> children',
        tabs: '<Tabs.Tab> children of <Tabs.List>',
      },
      slots: {
        content: { description: 'Content of the active panel.' },
        tabs: { description: 'Tabs/Tab instances.', only: true, preferred: ['Tabs/Tab'] },
      },
      usage:
        '<Tabs defaultValue="overview" variant="default" size="medium">\n  <Tabs.List>\n    <Tabs.Tab value="overview">Overview</Tabs.Tab>\n    <Tabs.Tab value="activity">Activity</Tabs.Tab>\n  </Tabs.List>\n  <Tabs.Panel value="overview">…</Tabs.Panel>\n</Tabs>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <Tabs
          {...target(index)}
          defaultValue={labels[0]}
          size={combo.size as 'medium'}
          style={{ width: 480 }}
          variant={combo.variant as 'default'}
        >
          <Tabs.List>
            <div style={{ display: 'contents' }} {...slot('tabs')}>
              {labels.map((label, item) => (
                <Tabs.Tab
                  key={label}
                  value={label}
                  {...text('label')}
                  {...part('Tabs/Tab', {
                    size: combo.size,
                    State: item ? 'Default' : 'Active',
                    tone: 'brand',
                    variant: combo.variant,
                  })}
                >
                  {label}
                </Tabs.Tab>
              ))}
            </div>
          </Tabs.List>
          <Tabs.Panel value={labels[0]}>
            <div className="flex w-full flex-col gap-xs" {...slot('content')}>
              <p className="style-text-prose-0 text-on-surface-variant">
                Panel content. Replace it with any layers.
              </p>
            </div>
          </Tabs.Panel>
        </Tabs>
      )}
    />
  ),
}
