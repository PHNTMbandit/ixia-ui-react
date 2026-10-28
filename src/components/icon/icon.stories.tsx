import type { Meta, StoryObj } from '@storybook/react-vite'
import { expect } from 'storybook/test'

import { Select } from '../select'
import { Icon } from './icon'
import { IconProvider } from './icon-provider'
import type { IconName, IconProps } from './icon.types'

const ICON_NAMES: IconName[] = [
  'add',
  'chevronDown',
  'chevronLeft',
  'chevronRight',
  'chevronUp',
  'chevronsUpDown',
  'close',
  'columnFilter',
  'copy',
  'delete',
  'download',
  'ellipsis',
  'error',
  'fieldError',
  'fileUpload',
  'filter',
  'firstPage',
  'folder',
  'folderExpandAll',
  'folderOpen',
  'hidden',
  'info',
  'lastPage',
  'locked',
  'minus',
  'percent',
  'search',
  'selected',
  'sort',
  'sortAscending',
  'sortDescending',
  'spinner',
  'success',
  'unlocked',
  'upload',
  'visible',
  'warning',
]

function SquareIcon(props: IconProps) {
  return (
    <svg data-testid="custom-icon" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="3" />
    </svg>
  )
}

export default {
  title: 'Components/Icon',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component:
          'Every icon in the library resolves from a registry that defaults to Phosphor. Wrap any part of your app in IconProvider to swap icons from another pack; providers can be nested and only replace the names they list. Parts that wrap an icon, such as Accordion.ExpandIcon, Breadcrumb.Separator, Dialog.Close and the calendar navigation buttons, also accept your own children.',
      },
    },
  },
} as Meta<typeof Icon>

type Story = StoryObj<typeof Icon>

export const Registry: Story = {
  name: 'Default Icons',
  render: () => (
    <ul className="grid grid-cols-4 gap-md">
      {ICON_NAMES.map((name) => (
        <li key={name} className="flex items-center gap-xs">
          <Icon name={name} className="size-md" />
          <span className="style-text-default--1">{name}</span>
        </li>
      ))}
    </ul>
  ),
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelectorAll('svg')).toHaveLength(ICON_NAMES.length)
  },
}

export const CustomPack: Story = {
  name: 'Custom Icon Pack',
  render: () => (
    <IconProvider icons={{ chevronsUpDown: SquareIcon }}>
      <Select>
        <Select.Trigger aria-label="Fruit">
          <Select.Value placeholder="Select a fruit" />
          <Select.Icon>
            <Icon name="chevronsUpDown" className="size-md" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Popup>
          <Select.List>
            <Select.Item value="apple">
              <Select.Title>Apple</Select.Title>
            </Select.Item>
          </Select.List>
        </Select.Popup>
      </Select>
    </IconProvider>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByTestId('custom-icon')).toBeVisible()
  },
}

export const Weight: Story = {
  name: 'Weight',
  render: () => (
    <div className="flex flex-col gap-md">
      <div className="flex items-center gap-md" data-testid="default-weight">
        <Icon name="search" className="size-md" />
      </div>
      <IconProvider weight="bold">
        <div className="flex items-center gap-md" data-testid="provider-weight">
          <Icon name="search" className="size-md" />
          <Icon name="search" weight="fill" className="size-md" />
          <IconProvider icons={{ add: SquareIcon }}>
            <Icon name="add" weight="fill" className="size-md" />
          </IconProvider>
        </div>
      </IconProvider>
    </div>
  ),
  play: async ({ canvas }) => {
    const regular = canvas.getByTestId('default-weight').querySelector('svg path'),
      [bold, fill] = [...canvas.getByTestId('provider-weight').querySelectorAll('svg')].map((svg) =>
        svg.querySelector('path')?.getAttribute('d'),
      )

    await expect(regular?.getAttribute('d')).not.toBe(bold)
    await expect(bold).not.toBe(fill)
    await expect(canvas.getByTestId('custom-icon')).not.toHaveAttribute('weight')
  },
}

export const NestedProviders: Story = {
  name: 'Nested Providers',
  render: () => (
    <IconProvider icons={{ add: SquareIcon }}>
      <div className="flex gap-md">
        <Icon name="add" className="size-md" />
        <IconProvider icons={{ close: SquareIcon }}>
          <Icon name="add" className="size-md" />
          <Icon name="close" className="size-md" />
        </IconProvider>
        <Icon name="close" className="size-md" />
      </div>
    </IconProvider>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getAllByTestId('custom-icon')).toHaveLength(3)
  },
}
