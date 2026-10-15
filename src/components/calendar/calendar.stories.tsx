import { enUS, ja } from '@daypicker/react/locale'
import { CalendarBlankIcon, ClockIcon } from '@phosphor-icons/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import React from 'react'

import { CalendarFooter } from '..'
import { Button } from '../button'
import { Input } from '../input'
import { InputGroupInput } from '../input-group'
import { InputGroup } from '../input-group/input-group'
import { PopoverPanel, PopoverTrigger } from '../popover'
import { Popover } from '../popover/popover'
import { Calendar } from './calendar'
import { CalendarHeader } from './calendar-header'
import { CalendarPanel } from './calendar-panel'
import { CalendarPicker } from './calendar-picker'
import { CalendarSummary } from './calendar-summary'
import type { CalendarSelected } from './calendar.types'

export default {
  title: 'Components/Calendar',
  component: CalendarPicker,
  parameters: {
    docs: {
      description: {
        component:
          'A calendar component that allows users to select dates and view events. It is built using the DayPicker library and can be customized with various props.',
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

export const Playground: Story = {}

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
    locale: enUS,
    formatters: {
      formatMonthDropdown: (date) => date.toLocaleString('en-US', { month: 'short' }),
    },
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
    )

    return (
      <Popover>
        <PopoverTrigger>
          <Button variant="outline" aria-label="Choose date">
            <CalendarBlankIcon weight="bold" />
            <span>{(selectedDates as Date).toLocaleDateString()}</span>
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
