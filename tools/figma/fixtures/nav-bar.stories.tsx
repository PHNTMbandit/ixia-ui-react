import type { Meta, StoryObj } from '@storybook/react-vite'

import { Icon } from '../../../src/components/icon'
import type { IconName } from '../../../src/components/icon'
import { NavBar } from '../../../src/components/nav-bar'
import { Matrix, part, show, slot, swap, target, text } from './figma'
import type { Combo, FigmaSpec } from './figma'

const meta = { tags: ['!dev', '!autodocs', '!test'], title: 'Figma/Nav Bar' } satisfies Meta
export default meta
type Story = StoryObj<typeof meta>
const base = { group: 'Nav Bar' }
const cva = { file: 'src/components/nav-bar/nav-bar.types.ts', name: 'navBarVariants' }
const inherited = {
  size: ['small', 'medium', 'large'],
  itemOrientation: ['horizontal', 'vertical'],
}
const labelVariant = (combo: Combo) => ({
  size: combo.size ?? 'medium',
  tone: combo.tone ?? 'neutral',
  State: combo.State === 'Active' || combo.State === 'Hover' ? 'Active' : 'Default',
})
const items: { label: string; icon: IconName }[] = [
  { label: 'Projects', icon: 'folder' },
  { label: 'Layers', icon: 'layers' },
  { label: 'Search', icon: 'search' },
]

function ItemParts({
  combo,
  label = 'Projects',
  icon = 'folder',
}: {
  combo: Combo
  label?: string
  icon?: IconName
}) {
  return (
    <>
      <NavBar.ItemIcon {...part('Nav Bar/Item Icon', labelVariant(combo))} {...show('showIcon')}>
        <Icon aria-hidden="true" name={icon} {...swap('icon')} />
      </NavBar.ItemIcon>
      <NavBar.ItemLabel
        {...part('Nav Bar/Item Label', labelVariant(combo))}
        {...show('showLabel')}
        {...text('label')}
      >
        {label}
      </NavBar.ItemLabel>
    </>
  )
}

export const ItemIcon: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Nav Bar/Item Icon',
      order: 480,
      cva: { file: cva.file, name: 'navBarItemVariants', axes: ['tone'] },
      axes: { size: inherited.size },
      defaults: { size: 'medium' },
      states: ['Default', 'Active'],
      description: 'Navigation icon inherits NavBar size and Item tone/active colors.',
      properties: { icon: '<Icon /> child' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <NavBar size={combo.size as 'medium'}>
          <NavBar.Item
            aria-label="Projects"
            tone={combo.tone as 'neutral'}
            isActive={combo.State === 'Active'}
          >
            <NavBar.ItemIcon {...target(index)}>
              <Icon aria-hidden="true" name="folder" {...swap('icon')} />
            </NavBar.ItemIcon>
          </NavBar.Item>
        </NavBar>
      )}
    />
  ),
}
export const ItemLabel: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Nav Bar/Item Label',
      order: 481,
      cva: { file: cva.file, name: 'navBarItemVariants', axes: ['tone'] },
      axes: { size: inherited.size },
      defaults: { size: 'medium' },
      states: ['Default', 'Active'],
      description: 'Navigation label inherits NavBar size and Item tone/active colors.',
      properties: { label: 'children' },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <NavBar size={combo.size as 'medium'}>
          <NavBar.Item tone={combo.tone as 'neutral'} isActive={combo.State === 'Active'}>
            <NavBar.ItemLabel {...target(index)} {...text('label')}>
              Projects
            </NavBar.ItemLabel>
          </NavBar.Item>
        </NavBar>
      )}
    />
  ),
}
export const Item: Story = {
  parameters: {
    figma: {
      ...base,
      component: 'Nav Bar/Item',
      order: 482,
      cva: { file: cva.file, name: 'navBarItemVariants', axes: ['tone'] },
      axes: inherited,
      defaults: { size: 'medium', itemOrientation: 'vertical' },
      states: ['Default', 'Hover', 'Active', 'Disabled'],
      interactive: { Hover: 'hover' },
      description:
        'Navigation button with real icon and label instances. size and itemOrientation are inherited from NavBar; tone and isActive belong to the item.',
      slots: {
        content: {
          description: 'Item icon and label.',
          preferred: ['Nav Bar/Item Icon', 'Nav Bar/Item Label'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <NavBar
          size={combo.size as 'medium'}
          itemOrientation={combo.itemOrientation as 'vertical'}
          style={{ width: 160 }}
        >
          <NavBar.Item
            {...target(index)}
            aria-label="Projects"
            aria-current={combo.State === 'Active' ? 'page' : undefined}
            isActive={combo.State === 'Active'}
            disabled={combo.State === 'Disabled'}
            tone={combo.tone as 'neutral'}
          >
            <div style={{ display: 'contents' }} {...slot('content')}>
              <ItemParts combo={combo} />
            </div>
          </NavBar.Item>
        </NavBar>
      )}
    />
  ),
}
export const Root: Story = {
  name: 'Nav Bar',
  parameters: {
    figma: {
      ...base,
      component: 'Nav Bar',
      order: 483,
      cva: { ...cva, axes: ['size', 'variant', 'itemOrientation'] },
      description:
        'Navigation collection. Add, remove or reorder Item instances; floating keeps its source positioning in a relative fixture host.',
      slots: {
        items: { description: 'Navigation items.', only: true, preferred: ['Nav Bar/Item'] },
      },
      usage:
        '<nav aria-label="Workspace"><NavBar><NavBar.Item isActive><NavBar.ItemIcon><Icon name="folder" /></NavBar.ItemIcon><NavBar.ItemLabel>Projects</NavBar.ItemLabel></NavBar.Item></NavBar></nav>',
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(combo, index) => (
        <nav
          aria-label={`Workspace navigation ${index + 1}`}
          style={{ width: 480, minHeight: 180, position: 'relative' }}
        >
          <NavBar
            {...target(index)}
            size={combo.size as 'medium'}
            itemOrientation={combo.itemOrientation as 'vertical'}
            variant={combo.variant as 'outline'}
          >
            <div style={{ display: 'contents' }} {...slot('items')}>
              {items.map((item, itemIndex) => (
                <NavBar.Item
                  key={item.label}
                  aria-label={item.label}
                  aria-current={itemIndex === 0 ? 'page' : undefined}
                  isActive={itemIndex === 0}
                  {...part('Nav Bar/Item', {
                    size: combo.size,
                    itemOrientation: combo.itemOrientation,
                    tone: 'neutral',
                    State: itemIndex === 0 ? 'Active' : 'Default',
                  })}
                >
                  <div style={{ display: 'contents' }} {...slot('content')}>
                    <ItemParts
                      combo={{
                        ...combo,
                        tone: 'neutral',
                        State: itemIndex === 0 ? 'Active' : 'Default',
                      }}
                      {...item}
                    />
                  </div>
                </NavBar.Item>
              ))}
            </div>
          </NavBar>
        </nav>
      )}
    />
  ),
}
