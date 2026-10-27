import { BowlFoodIcon, CaretUpDownIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { Select } from './index'
import type { SelectProps, SelectTriggerProps } from './select.types'

const VARIANTS = ['primary', 'secondary', 'ghost'] as const,
  SIZES = ['small', 'medium', 'large'] as const

type SelectVariant = NonNullable<SelectTriggerProps['variant']>
type SelectSize = NonNullable<SelectTriggerProps['size']>
type SelectStoryArgs = Omit<SelectProps<string>, 'defaultValue'> & {
  defaultValue?: string | string[]
  variant?: SelectVariant
  size?: SelectSize
}

const apples = [
    { label: 'Gala', value: 'gala' },
    { label: 'Fuji', value: 'fuji' },
    { label: 'Honeycrisp', value: 'honeycrisp' },
    { label: 'Granny Smith', value: 'granny-smith' },
    { label: 'Pink Lady', value: 'pink-lady' },
    { label: 'Red Delicious', value: 'red-delicious' },
    { label: 'Golden Delicious', value: 'golden-delicious' },
    { label: 'Braeburn', value: 'braeburn' },
    { label: 'McIntosh', value: 'mcintosh' },
    { label: 'Cortland', value: 'cortland' },
    { label: 'Empire', value: 'empire' },
  ],
  groupedProduce = [
    {
      items: [
        { value: 'apple', label: 'Apple' },
        { value: 'banana', label: 'Banana' },
        { value: 'mango', label: 'Mango' },
        { value: 'kiwi', label: 'Kiwi' },
        { value: 'grape', label: 'Grape' },
        { value: 'orange', label: 'Orange' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'watermelon', label: 'Watermelon' },
      ],
      value: 'Fruits',
    },
    {
      items: [
        { value: 'broccoli', label: 'Broccoli' },
        { value: 'carrot', label: 'Carrot' },
        { value: 'cauliflower', label: 'Cauliflower' },
        { value: 'cucumber', label: 'Cucumber' },
        { value: 'kale', label: 'Kale' },
        { value: 'pepper', label: 'Bell pepper' },
        { value: 'spinach', label: 'Spinach' },
        { value: 'zucchini', label: 'Zucchini' },
      ],
      value: 'Vegetables',
    },
  ],
  AppleSelect = ({
    defaultValue,
    multiple = false,
    variant = 'primary',
    size = 'medium',
    placeholder = 'Select an apple',
    disabled = false,
    iconOnly = false,
  }: {
    defaultValue?: string | string[]
    multiple?: boolean
    variant?: SelectVariant
    size?: SelectSize
    placeholder?: string
    disabled?: boolean
    iconOnly?: boolean
  }) => (
    <Select defaultValue={defaultValue} multiple={multiple} disabled={disabled}>
      <Select.Trigger
        aria-label={placeholder}
        variant={variant}
        size={size}
        className={iconOnly ? 'aspect-square justify-center p-0' : undefined}
      >
        {iconOnly ? (
          <BowlFoodIcon />
        ) : (
          <>
            <Select.Value placeholder={placeholder}>
              {(value: keyof typeof apples) => (
                <>
                  <BowlFoodIcon />
                  {apples.find((apple) => apple.value === value)?.label || placeholder}
                </>
              )}
            </Select.Value>
            <Select.Icon>
              <CaretUpDownIcon weight="bold" />
            </Select.Icon>
          </>
        )}
      </Select.Trigger>
      <Select.Popup alignItemWithTrigger={false} sideOffset={8}>
        <Select.List>
          {apples.map(({ label, value }) => (
            <Select.Item key={label} value={value}>
              <Select.Title>
                <BowlFoodIcon />
                {label}
              </Select.Title>
            </Select.Item>
          ))}
        </Select.List>
      </Select.Popup>
    </Select>
  ),
  GroupedProduceSelect = ({ multiple = false }: { multiple?: boolean }) => (
    <Select multiple={multiple}>
      <Select.Trigger aria-label="Select produce">
        <Select.Value placeholder="Select produce" />
        <Select.Icon>
          <CaretUpDownIcon weight="bold" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Popup alignItemWithTrigger={false} sideOffset={8}>
        <Select.List>
          {groupedProduce.map((group) => (
            <Select.Group key={group.value}>
              <Select.GroupLabel>{group.value}</Select.GroupLabel>
              {group.items.map((item) => (
                <Select.Item key={item.value} value={item.value}>
                  <Select.Title>{item.label}</Select.Title>
                </Select.Item>
              ))}
            </Select.Group>
          ))}
        </Select.List>
      </Select.Popup>
    </Select>
  ),
  applesWithDescription = [
    { description: 'Mild and sweet with a crisp bite', label: 'Gala', value: 'gala' },
    { description: 'Extra sweet and juicy, great for snacking', label: 'Fuji', value: 'fuji' },
    {
      description: 'Explosively crisp with balanced tartness',
      label: 'Honeycrisp',
      value: 'honeycrisp',
    },
    {
      description: 'Tart and firm, ideal for baking',
      label: 'Granny Smith',
      value: 'granny-smith',
    },
    { description: 'Sweet-tart with a refreshing finish', label: 'Pink Lady', value: 'pink-lady' },
    {
      description: 'Mellow, sweet, and classically crunchy',
      label: 'Red Delicious',
      value: 'red-delicious',
    },
  ],
  AppleDescriptionSelect = ({
    multiple = false,
    placeholder = 'Select an apple',
  }: {
    multiple?: boolean
    placeholder?: string
  }) => (
    <Select multiple={multiple}>
      <Select.Trigger aria-label={placeholder}>
        <Select.Value placeholder={placeholder}>
          {(value: string) => (
            <>
              <BowlFoodIcon />
              {applesWithDescription.find((apple) => apple.value === value)?.label || placeholder}
            </>
          )}
        </Select.Value>
        <Select.Icon>
          <CaretUpDownIcon weight="bold" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Popup alignItemWithTrigger={false} sideOffset={8}>
        <Select.List>
          {applesWithDescription.map(({ label, value, description }) => (
            <Select.Item key={value} value={value}>
              <Select.Title>{label}</Select.Title>
              <Select.Description>{description}</Select.Description>
            </Select.Item>
          ))}
        </Select.List>
      </Select.Popup>
    </Select>
  )

export default {
  argTypes: {
    defaultValue: {
      control: 'object',
      description: 'Initial selected value or values for uncontrolled selects.',
    },
    multiple: {
      control: 'boolean',
      description: 'Allows selecting more than one option from the list.',
      table: {
        defaultValue: { summary: '' },
      },
    },
    size: {
      control: 'radio',
      description: 'Controls the trigger height and spacing.',
      options: SIZES,
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    variant: {
      control: 'radio',
      description: 'Controls the trigger visual style.',
      options: VARIANTS,
      table: {
        defaultValue: { summary: 'default' },
      },
    },
  },
  args: {
    multiple: false,
  },
  component: AppleSelect,
  parameters: {
    docs: {
      description: {
        component:
          'The Select component presents a controlled or uncontrolled choice list inside a popup. It supports single and multiple selection, grouped options, trigger variants (`default`, `secondary`), trigger sizes (`small`, `medium`, `large`), custom trigger/value composition, and scrollable lists for longer datasets.',
      },
      subtitle: 'A composed selection control for choosing one or more options from a popup list.',
    },
  },
  render: (args) => {
    const { defaultValue, multiple, variant, size } = args

    return (
      <AppleSelect defaultValue={defaultValue} multiple={multiple} variant={variant} size={size} />
    )
  },
  subcomponents: {
    SelectIcon: Select.Icon,
    SelectItem: Select.Item,
    SelectList: Select.List,
    SelectPopup: Select.Popup,
    SelectTrigger: Select.Trigger,
    SelectValue: Select.Value,
  },
  title: 'Components/Select',
} satisfies Meta<SelectStoryArgs>

type Story = StoryObj<SelectStoryArgs>

export const Playground: Story = {
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story:
          'Use the controls panel to explore single or multiple selection with the base apple dataset.',
      },
    },
  },
}

export const Default: Story = {
  name: 'Selection / Single',
  parameters: {
    docs: {
      description: {
        story: 'Default single-select usage for choosing one option from a short list.',
      },
    },
  },
}

export const Multiple: Story = {
  name: 'Selection / Multiple',
  parameters: {
    docs: {
      description: {
        story: 'Enables multi-select behavior for tag-like or filter-style selection flows.',
      },
    },
  },
}

export const VariantPrimary: Story = {
  name: 'Variant / Primary',
  parameters: {
    docs: {
      description: {
        story: 'Primary trigger style for standard forms and data-entry flows.',
      },
    },
  },
  render: () => <AppleSelect variant="primary" />,
}

export const VariantSecondary: Story = {
  name: 'Variant / Secondary',
  parameters: {
    docs: {
      description: {
        story: 'Secondary trigger style for lower-emphasis or supportive selection inputs.',
      },
    },
  },
  render: () => <AppleSelect variant="secondary" />,
}

export const VariantGhost: Story = {
  name: 'Variant / Ghost',
  parameters: {
    docs: {
      description: {
        story:
          'Ghost trigger style for minimal or inline selection controls, often used in toolbars or dense UIs.',
      },
    },
  },
  render: () => <AppleSelect variant="ghost" />,
}

export const SizeSmall: Story = {
  name: 'Size / Small',
  parameters: {
    docs: {
      description: {
        story: 'Compact trigger size suited to dense layouts and table filters.',
      },
    },
  },
  render: () => <AppleSelect size="small" />,
}

export const SizeMedium: Story = {
  name: 'Size / Medium',
  parameters: {
    docs: {
      description: {
        story: 'Default trigger size for most form and settings interfaces.',
      },
    },
  },
  render: () => <AppleSelect size="medium" />,
}

export const SizeLarge: Story = {
  name: 'Size / Large',
  parameters: {
    docs: {
      description: {
        story: 'Larger trigger size for touch-friendly forms and prominent controls.',
      },
    },
  },
  render: () => <AppleSelect size="large" />,
}

export const IndicatorSizes: Story = {
  name: 'Composition / Indicator Sizes',
  parameters: {
    docs: {
      description: {
        story:
          'The dropdown indicator is one size smaller than the leading value icon at each trigger size.',
      },
    },
  },
  render: () => (
    <div className="flex items-center gap-sm">
      {SIZES.map((size) => (
        <div key={size} data-testid={size}>
          <AppleSelect size={size} defaultValue="fuji" />
        </div>
      ))}
    </div>
  ),
  play: async ({ canvas }) => {
    for (const [index, size] of SIZES.entries()) {
      const row = canvas.getByTestId(size),
        valueIcon = row.querySelector('[data-value] svg')!,
        indicator = row.querySelector('[data-slot="select-icon"] svg')!,
        reference = document.createElement('div')

      reference.style.width = `var(--spacing-${['sm', 'md', 'lg'][index]})`
      reference.style.height = `var(--spacing-${['xs', 'sm', 'md'][index]})`
      row.append(reference)

      try {
        const bounds = reference.getBoundingClientRect()

        await expect(valueIcon.getBoundingClientRect().width).toBeCloseTo(bounds.width, 1)
        await expect(valueIcon.getBoundingClientRect().height).toBeCloseTo(bounds.width, 1)
        await expect(indicator.getBoundingClientRect().width).toBeCloseTo(bounds.height, 1)
        await expect(indicator.getBoundingClientRect().height).toBeCloseTo(bounds.height, 1)
      } finally {
        reference.remove()
      }
    }
  },
}

export const IconSmall: Story = {
  name: 'Size / Icon Small',
  parameters: {
    docs: {
      description: {
        story: 'Compact icon-only trigger using the small size with square, padding-free styling.',
      },
    },
  },
  render: () => <AppleSelect size="small" iconOnly />,
}

export const IconMedium: Story = {
  name: 'Size / Icon Medium',
  parameters: {
    docs: {
      description: {
        story: 'Default icon-only trigger using the medium size and an accessible label.',
      },
    },
  },
  render: () => <AppleSelect size="medium" iconOnly />,
}

export const IconLarge: Story = {
  name: 'Size / Icon Large',
  parameters: {
    docs: {
      description: {
        story:
          'Prominent icon-only trigger using the large size with a proportionally larger icon.',
      },
    },
  },
  render: () => <AppleSelect size="large" iconOnly />,
}

export const IconSizes: Story = {
  name: 'Composition / Icon Sizes',
  parameters: {
    docs: {
      description: {
        story:
          'All three icon-only sizes across primary, secondary, and ghost variants. Use the regular size prop with aspect-square, justify-center, and p-0 utilities; no separate icon size is needed.',
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-sm">
      {VARIANTS.map((variant) => (
        <div key={variant} className="flex items-center gap-sm">
          {SIZES.map((size) => (
            <div key={size} data-testid={`${variant}-${size}`}>
              <AppleSelect variant={variant} size={size} iconOnly />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
  play: async ({ canvas, canvasElement }) => {
    for (const variant of VARIANTS) {
      for (const [index, size] of SIZES.entries()) {
        const row = canvas.getByTestId(`${variant}-${size}`),
          trigger = within(row).getByRole('combobox'),
          bounds = trigger.getBoundingClientRect(),
          reference = document.createElement('div')

        reference.style.width = `var(--spacing-${['lg', 'xl', '2xl'][index]})`
        reference.style.height = `var(--spacing-${['sm', 'md', 'lg'][index]})`
        row.append(reference)

        try {
          await expect(trigger).toHaveAccessibleName('Select an apple')
          await expect(Number.parseFloat(getComputedStyle(trigger).lineHeight)).toBeCloseTo(
            Number.parseFloat(getComputedStyle(trigger).fontSize),
            1,
          )
          await expect(bounds.width).toBeCloseTo(reference.getBoundingClientRect().width, 1)
          await expect(bounds.height).toBeCloseTo(bounds.width, 1)
          await expect(getComputedStyle(trigger).paddingLeft).toBe('0px')
          await expect(getComputedStyle(trigger).paddingRight).toBe('0px')
          await expect(trigger.querySelector('svg')!.getBoundingClientRect().width).toBeCloseTo(
            reference.getBoundingClientRect().height,
            1,
          )
        } finally {
          reference.remove()
        }
      }
    }

    const trigger = within(canvas.getByTestId('primary-medium')).getByRole('combobox'),
      page = within(canvasElement.ownerDocument.body)

    trigger.focus()
    await userEvent.keyboard('{ArrowDown}')
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'true'))
    await userEvent.click(await page.findByRole('option', { name: /^Fuji$/ }))
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'))
    trigger.focus()
    await userEvent.keyboard('{ArrowDown}')
    await expect(await page.findByRole('option', { name: /^Fuji$/ })).toHaveAttribute(
      'aria-selected',
      'true',
    )
    await userEvent.keyboard('{Escape}')
    await waitFor(() => expect(trigger).toHaveAttribute('aria-expanded', 'false'))
  },
}

export const Grouped: Story = {
  name: 'Composition / Grouped Options',
  parameters: {
    docs: {
      description: {
        story: 'Grouped lists help organize longer datasets by category or hierarchy.',
      },
    },
  },
  render: () => <GroupedProduceSelect />,
}

export const GroupedMultiple: Story = {
  name: 'Composition / Grouped Multiple',
  parameters: {
    docs: {
      description: {
        story:
          'Combines grouped organization with multiple selection for richer filter or settings UIs.',
      },
    },
  },
  render: () => <GroupedProduceSelect multiple />,
}

export const WithItemDescription: Story = {
  name: 'Composition / Item Description',
  parameters: {
    docs: {
      description: {
        story:
          'Renders a secondary description line beneath each option label to add context for richer choices.',
      },
    },
  },
  render: () => <AppleDescriptionSelect />,
}

export const WithDefaultValue: Story = {
  args: {
    defaultValue: 'honeycrisp',
  },
  name: 'State / Default Value',
  parameters: {
    docs: {
      description: {
        story: 'Use `defaultValue` to initialize an uncontrolled select with a persisted choice.',
      },
    },
  },
}

export const WithDefaultMultipleValues: Story = {
  args: {
    defaultValue: ['fuji', 'pink-lady'],
  },
  name: 'State / Default Multiple Values',
  parameters: {
    docs: {
      description: {
        story: 'Initializes a multi-select with more than one preselected option.',
      },
    },
  },
}

export const Disabled: Story = {
  name: 'State / Disabled',
  parameters: {
    docs: {
      description: {
        story:
          'Disables the select trigger and prevents interaction with the popup list. Useful for read-only or conditional states.',
      },
    },
  },
  render: () => <AppleSelect variant="primary" size="medium" defaultValue="fuji" disabled />,
}

export const WithOnValueChange: Story = {
  name: 'State / Controlled onValueChange',
  parameters: {
    docs: {
      description: {
        story:
          'Controlled usage that demonstrates type safety: typing `Select<string>` makes the `onValueChange` value a `string | null`, so `setSelected` and the rendered label are fully inferred without casts.',
      },
    },
  },
  render: () => {
    const [selected, setSelected] = useState<string | null>('gala')

    return (
      <div className="flex flex-col gap-sm">
        <Select<string>
          value={selected}
          onValueChange={(value) => {
            setSelected(value)
          }}
        >
          <Select.Trigger aria-label="Select an apple">
            <Select.Value placeholder="Select an apple">
              {(value: string) => (
                <>
                  <BowlFoodIcon />
                  {apples.find((apple) => apple.value === value)?.label || 'Select an apple'}
                </>
              )}
            </Select.Value>
            <Select.Icon>
              <CaretUpDownIcon weight="bold" />
            </Select.Icon>
          </Select.Trigger>
          <Select.Popup alignItemWithTrigger={false} sideOffset={8}>
            <Select.List>
              {apples.map(({ label, value }) => (
                <Select.Item key={label} value={value}>
                  <Select.Title>
                    <BowlFoodIcon />
                    {label}
                  </Select.Title>
                </Select.Item>
              ))}
            </Select.List>
          </Select.Popup>
        </Select>
        <p className="style-text-default-0">Selected value: {selected ?? 'none'}</p>
      </div>
    )
  },
}
