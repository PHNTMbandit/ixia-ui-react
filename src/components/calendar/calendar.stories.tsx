import { enUS, ja } from '@daypicker/react/locale'
import {
  CalendarBlankIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  ClockIcon,
} from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'
import { expect, userEvent, waitFor, within } from 'storybook/test'

import { CalendarFooter } from '..'
import { Button } from '../button'
import { IconProvider } from '../icon'
import type { IconOverrides, IconProps } from '../icon'
import { Input } from '../input'
import { InputGroupInput } from '../input-group'
import { InputGroup } from '../input-group/input-group'
import { PopoverPanel, PopoverTrigger } from '../popover'
import { Popover } from '../popover/popover'
import { SelectIcon } from '../select'
import { Calendar } from './calendar'
import { CalendarDropdown } from './calendar-dropdown'
import { CalendarHeader } from './calendar-header'
import { CalendarNextMonthButton } from './calendar-next-month-button'
import { CalendarPanel } from './calendar-panel'
import { CalendarPicker } from './calendar-picker'
import { CalendarPreviousMonthButton } from './calendar-previous-month-button'
import { CalendarSummary } from './calendar-summary'
import type {
  CalendarComponents,
  CalendarDropdownProps,
  CalendarNextMonthButtonProps,
  CalendarPreviousMonthButtonProps,
  CalendarSelected,
} from './calendar.types'

const CUSTOM_ICON_PROPS = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: 2,
  viewBox: '0 0 24 24',
} as const

function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...CUSTOM_ICON_PROPS} {...props}>
      <path d="M19 12H5m6-6-6 6 6 6" />
    </svg>
  )
}

function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...CUSTOM_ICON_PROPS} {...props}>
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  )
}

function ExampleDropdown(props: CalendarDropdownProps) {
  return (
    <CalendarDropdown {...props}>
      <SelectIcon>
        <CaretDownIcon aria-hidden="true" weight="bold" />
      </SelectIcon>
    </CalendarDropdown>
  )
}

function ExampleNextMonthButton(props: CalendarNextMonthButtonProps) {
  return (
    <CalendarNextMonthButton {...props}>
      <CaretRightIcon aria-hidden="true" weight="bold" />
    </CalendarNextMonthButton>
  )
}

function ExamplePreviousMonthButton(props: CalendarPreviousMonthButtonProps) {
  return (
    <CalendarPreviousMonthButton {...props}>
      <CaretLeftIcon aria-hidden="true" weight="bold" />
    </CalendarPreviousMonthButton>
  )
}

const customIcons: IconOverrides = {
    chevronLeft: ArrowLeftIcon,
    chevronRight: ArrowRightIcon,
  },
  composedComponents: CalendarComponents = {
    Dropdown: ExampleDropdown,
    NextMonthButton: ExampleNextMonthButton,
    PreviousMonthButton: ExamplePreviousMonthButton,
  }

export default {
  title: 'Components/Calendar',
  component: CalendarPicker,
  parameters: {
    docs: {
      description: {
        component:
          'A calendar component that allows users to select dates and view events. It is built using the DayPicker library and can be customized with various props. Navigation and dropdown icons use the Phosphor defaults. Replace them for every component with IconProvider, or compose your own icons as children of CalendarDropdown, CalendarNextMonthButton, and CalendarPreviousMonthButton passed through the components prop (define those wrappers outside render to preserve component identity). Default day button labels include the displayed day followed by the full date and selection context; custom labels can be supplied through the labels prop.',
      },
    },
  },
  args: {
    animate: true,
    fixedWeeks: true,
    mode: 'single',
    showOutsideDays: true,
    variant: 'elevated',
  },
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['single', 'multiple', 'range'],
    },
    variant: {
      control: { type: 'select' },
      options: ['elevated', 'ghost', 'outline'],
    },
  },
  render: (args) => (
    <Calendar>
      <CalendarPanel>
        <CalendarPicker {...args} />
      </CalendarPanel>
    </Calendar>
  ),
} as Meta<typeof CalendarPicker>

type Story = StoryObj<typeof CalendarPicker>

export const Playground: Story = {
  args: {
    defaultMonth: new Date(2026, 7, 1),
  },
  play: async ({ canvas }) => {
    const navigation = canvas.getByRole('navigation'),
      buttons = navigation.querySelectorAll('button'),
      monthGrid = canvas.getByRole('grid'),
      expectedSize = navigation.getBoundingClientRect().height

    await expect(buttons).toHaveLength(2)
    await expect(expectedSize).toBeGreaterThan(0)
    await expect(getComputedStyle(monthGrid).borderCollapse).toBe('separate')
    await expect(Number.parseFloat(getComputedStyle(monthGrid).borderSpacing)).toBeGreaterThan(0)
    for (const button of buttons) {
      const bounds = button.getBoundingClientRect()

      await expect(bounds.width).toBeCloseTo(bounds.height, 1)
    }
    const day = canvas.getByRole('button', { name: /\b15th\b/ }),
      dayBounds = day.getBoundingClientRect()

    await expect(day).toHaveClass('size-xl!')
    await expect(dayBounds.width).toBeCloseTo(dayBounds.height, 1)

    const next = canvas.getByRole('button', { name: /next month/i }),
      previous = canvas.getByRole('button', { name: /previous month/i })

    await expect(next.querySelector('svg')).toBeVisible()
    await expect(previous.querySelector('svg')).toBeVisible()
    await expect(next.querySelector('.rdp-chevron')).toBeNull()
    await expect(getComputedStyle(next.querySelector('svg') as SVGElement).fill).toBe(
      getComputedStyle(next).color,
    )
    await userEvent.click(next)
    await expect(canvas.getByRole('grid', { name: 'September 2026' })).toBeVisible()
    await waitFor(() => expect(canvas.getAllByRole('grid', { hidden: true })).toHaveLength(1))
    await userEvent.click(previous)
    await expect(canvas.getByRole('grid', { name: 'August 2026' })).toBeVisible()
    await waitFor(() => expect(canvas.getAllByRole('grid', { hidden: true })).toHaveLength(1))
  },
}

export const Ghost: Story = {
  name: 'Variant / Ghost',
  render: (args) => (
    <Calendar>
      <CalendarPanel variant="ghost">
        <CalendarPicker {...args} />
      </CalendarPanel>
    </Calendar>
  ),
}

export const Outline: Story = {
  name: 'Variant / Outline',
  render: (args) => (
    <Calendar>
      <CalendarPanel variant="outline">
        <CalendarPicker {...args} />
      </CalendarPanel>
    </Calendar>
  ),
}

export const Range: Story = {
  name: 'Mode / Range',
  args: {
    mode: 'range',
    numberOfMonths: 2,
    showOutsideDays: false,
  },
}

export const Multiple: Story = {
  name: 'Mode / Multiple',
  args: {
    mode: 'multiple',
    numberOfMonths: 2,
    showOutsideDays: false,
  },
}

export const Dropdown: Story = {
  name: 'Composition / Dropdown',
  args: {
    captionLayout: 'dropdown',
    defaultMonth: new Date(2026, 7, 1),
    startMonth: new Date(2025, 0, 1),
    endMonth: new Date(2027, 11, 1),
    locale: enUS,
    formatters: {
      formatMonthDropdown: (date) => date.toLocaleString('en-US', { month: 'short' }),
    },
  },
  play: async ({ canvas, canvasElement }) => {
    const month = canvas.getByRole('combobox', { name: /month/i }),
      year = canvas.getByRole('combobox', { name: /year/i }),
      page = within(canvasElement.ownerDocument.body)

    await expect(month.querySelector('svg')).toBeVisible()
    await expect(year.querySelector('svg')).toBeVisible()
    await userEvent.click(month)
    await userEvent.click(await page.findByRole('option', { name: 'Sep' }))
    await expect(canvas.getByRole('grid', { name: 'September 2026' })).toBeVisible()
    await waitFor(() => expect(canvas.getAllByRole('grid', { hidden: true })).toHaveLength(1))
    await userEvent.click(year)
    await userEvent.click(await page.findByRole('option', { name: '2027' }))
    await expect(canvas.getByRole('grid', { name: 'September 2027' })).toBeVisible()
    await waitFor(() => expect(canvas.getAllByRole('grid', { hidden: true })).toHaveLength(1))
  },
}

export const CustomIconPack: Story = {
  name: 'Icons / Custom Pack',
  render: (args) => (
    <IconProvider icons={customIcons}>
      <Calendar>
        <CalendarPanel>
          <CalendarPicker {...args} />
        </CalendarPanel>
      </Calendar>
    </IconProvider>
  ),
}

export const ComposedIcons: Story = {
  name: 'Icons / Composed',
  args: {
    captionLayout: 'dropdown',
    components: composedComponents,
    defaultMonth: new Date(2026, 7, 1),
    endMonth: new Date(2027, 11, 1),
    startMonth: new Date(2025, 0, 1),
  },
}

export const Controlled: Story = {
  name: 'Composition / Controlled',
  render: (args) => {
    const [selectedDates, setSelectedDates] = React.useState<CalendarSelected | undefined>(
      new Date('2026-08-15'),
    )

    return (
      <Calendar defaultState={{ selectedDates }}>
        <Input
          value={selectedDates ? (selectedDates as Date).toISOString().split('T')[0] : ''}
          onValueChange={(event) => setSelectedDates(event ? new Date(event) : undefined)}
          type="date"
          aria-label="Selected date"
          className={'mb-md w-fit'}
        />
        <CalendarPanel>
          <CalendarPicker {...args} selected={selectedDates} onSelect={setSelectedDates} />
        </CalendarPanel>
      </Calendar>
    )
  },
}

export const Summary: Story = {
  name: 'Composition / Summary',
  render: (args) => (
    <Calendar>
      <CalendarHeader>
        <CalendarSummary />
      </CalendarHeader>
      <CalendarPanel>
        <CalendarPicker {...args} />
      </CalendarPanel>
    </Calendar>
  ),
}

export const Presets: Story = {
  name: 'Composition / Presets',
  render: (args) => {
    const [currentDate, setCurrentDate] = React.useState<CalendarSelected | undefined>(
      new Date('2026-08-15'),
    )
    const handleTodayClick = () => {
      setCurrentDate(new Date())
    }
    return (
      <Calendar>
        <CalendarPanel>
          <CalendarPicker selected={currentDate} onSelect={setCurrentDate} {...args} />
          <CalendarFooter>
            <Button variant={'outline'} onClick={handleTodayClick}>
              Today
            </Button>
            <Button
              variant={'outline'}
              onClick={() => setCurrentDate(new Date(Date.now() + 86400000))}
            >
              Tomorrow
            </Button>
            <Button
              variant={'outline'}
              onClick={() => setCurrentDate(new Date(Date.now() + 3 * 86400000))}
            >
              In 3 days
            </Button>
            <Button
              variant={'outline'}
              onClick={() => setCurrentDate(new Date(Date.now() + 7 * 86400000))}
            >
              In 7 days
            </Button>
            <Button
              variant={'outline'}
              onClick={() => setCurrentDate(new Date(Date.now() + 30 * 86400000))}
            >
              In 30 days
            </Button>
          </CalendarFooter>
        </CalendarPanel>
      </Calendar>
    )
  },
}

export const DateTimePicker: Story = {
  name: 'Composition / Date Time Picker',
  render: (args) => {
    return (
      <Calendar>
        <CalendarPanel>
          <CalendarPicker {...args} />
          <CalendarFooter>
            <InputGroup variant={'secondary'}>
              <ClockIcon weight="bold" />
              <InputGroupInput
                onValueChange={() => {}}
                type="time"
                step={1}
                defaultValue={'10:30:00'}
                aria-label="Time"
              />
            </InputGroup>
          </CalendarFooter>
        </CalendarPanel>
      </Calendar>
    )
  },
}

export const BookedDates: Story = {
  name: 'Composition / Booked Dates',
  render: (args) => {
    const today = new Date(),
      bookedDates = Array.from(
        { length: 14 },
        (_, index) => new Date(today.getFullYear(), today.getMonth(), today.getDate() + index + 1),
      )

    return (
      <Calendar>
        <CalendarPanel>
          <CalendarPicker
            disabled={bookedDates}
            modifiers={{
              booked: bookedDates,
            }}
            modifiersClassNames={{
              booked: '[&>button]:line-through',
            }}
            {...args}
          />
        </CalendarPanel>
      </Calendar>
    )
  },
}

export const Localized: Story = {
  name: 'Composition / Localized',
  args: {
    locale: ja,
  },
}

export const AsPopup: Story = {
  name: 'Composition / As Popup',
  render: (args) => {
    const [selectedDates, setSelectedDates] = React.useState<CalendarSelected | undefined>(
        new Date(),
      ),
      selectedLabel = (selectedDates as Date).toLocaleDateString()

    return (
      <Popover>
        <PopoverTrigger>
          <Button
            variant="outline"
            aria-label={`Choose date: ${(selectedDates as Date).toLocaleDateString()}`}
          >
            <CalendarBlankIcon weight="bold" />
            <span>{selectedLabel}</span>
          </Button>
        </PopoverTrigger>
        <PopoverPanel>
          <Calendar>
            <CalendarPanel variant={'ghost'}>
              <CalendarPicker {...args} selected={selectedDates} onSelect={setSelectedDates} />
            </CalendarPanel>
          </Calendar>
        </PopoverPanel>
      </Popover>
    )
  },
}
