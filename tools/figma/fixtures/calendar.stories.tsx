import { Day } from '@daypicker/react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'

import { Button } from '../../../src/components/button'
import { Calendar } from '../../../src/components/calendar'
import type {
  CalendarComponents,
  CalendarPanelProps,
  CalendarChevronProps,
} from '../../../src/components/calendar/calendar.types'
import { Matrix, part, slot, target, text } from './figma'
import type { Combo, FigmaSpec } from './figma'

export default { title: 'Figma/Calendar', tags: ['!dev', '!autodocs', '!test'] } satisfies Meta
type Story = StoryObj
const month = new Date(2026, 10, 1),
  selected = new Date(2026, 10, 15)
const ref = (name: string) => part(`Calendar/${name}`, {})

function atom(
  name: string,
  order: number,
  render: (combo: Combo, index: number) => ReactNode,
  spec: Partial<FigmaSpec> = {},
): Story {
  return {
    parameters: {
      figma: {
        component: `Calendar/${name}`,
        group: 'Calendar',
        order,
        description: `${name} for a Calendar composition.`,
        ...spec,
      } satisfies FigmaSpec,
    },
    render: () => (
      <Matrix
        render={(combo, index) => (
          <Calendar defaultState={{ selectedDates: selected }}>{render(combo, index)}</Calendar>
        )}
      />
    ),
  }
}

export const Chevron = atom(
  'Chevron',
  680,
  (combo, index) => (
    <span {...target(index)} className="inline-flex">
      <Calendar.Chevron orientation={combo.orientation as CalendarChevronProps['orientation']} />
    </span>
  ),
  { axes: { orientation: ['left', 'right', 'up', 'down'] } },
)

export const PreviousMonthButton = atom('PreviousMonthButton', 681, (_combo, index) => (
  <Calendar.PreviousMonthButton {...target(index)} aria-label="Previous month" />
))
export const NextMonthButton = atom('NextMonthButton', 682, (_combo, index) => (
  <Calendar.NextMonthButton {...target(index)} aria-label="Next month" />
))
export const Dropdown = atom(
  'Dropdown',
  683,
  (_combo, index) => (
    <div {...target(index)}>
      <Calendar.Dropdown
        value={10}
        options={[{ value: 10, label: 'November', disabled: false }]}
        aria-label="Month"
      />
    </div>
  ),
  {
    annotate: [
      { selector: '[data-figma-target] [data-slot="select-value"]', attrs: { text: 'label' } },
    ],
  },
)

export const Summary = atom(
  'Summary',
  684,
  (_combo, index) => <Calendar.Summary {...target(index)} />,
  {
    annotate: [
      { selector: '[data-figma-target] > span:first-child', attrs: { text: 'today' } },
      { selector: '[data-figma-target] > span:nth-child(2)', attrs: { text: 'selection' } },
    ],
  },
)

export const DayButton = atom(
  'DayButton',
  685,
  (combo, index) => (
    <Calendar.Picker
      month={month}
      today={month}
      animate={false}
      selected={combo.State === 'Selected' ? selected : undefined}
      disabled={combo.State === 'Disabled' ? selected : undefined}
      components={{
        Day: (props) => (
          <Day
            {...props}
            {...(props.day.date.getDate() === 15 && !props.modifiers.outside ? target(index) : {})}
          />
        ),
        DayButton: (props) => <Calendar.DayButton {...props} {...text('label')} />,
      }}
    />
  ),
  {
    states: ['Default', 'Selected', 'Disabled'],
    description:
      'Calendar day cell, including its selection background. Edit the day label and selection state.',
  },
)

const pickerParts: CalendarComponents = {
  Day: (props) => (
    <Day
      {...props}
      {...part('Calendar/DayButton', {
        State: props.modifiers.disabled
          ? 'Disabled'
          : props.modifiers.selected
            ? 'Selected'
            : 'Default',
      })}
    />
  ),
  DayButton: (props) => <Calendar.DayButton {...props} {...text('label')} />,
  PreviousMonthButton: (props) => (
    <Calendar.PreviousMonthButton {...props} {...ref('PreviousMonthButton')} />
  ),
  NextMonthButton: (props) => <Calendar.NextMonthButton {...props} {...ref('NextMonthButton')} />,
}

export const Picker = atom(
  'Picker',
  686,
  (_combo, index) => (
    <div {...target(index)}>
      <div {...slot('content')}>
        <Calendar.Picker
          month={month}
          today={month}
          animate={false}
          fixedWeeks
          components={pickerParts}
        />
      </div>
    </div>
  ),
  {
    slots: {
      content: {
        description:
          'Editable calendar grid with real day and navigation instances. Dates are presentation content, not a live date engine.',
      },
    },
  },
)

export const Header = atom(
  'Header',
  687,
  (_combo, index) => (
    <Calendar.Header {...target(index)}>
      <div {...slot('content')}>
        <Calendar.Summary {...ref('Summary')} />
      </div>
    </Calendar.Header>
  ),
  { slots: { content: { description: 'Summary or custom header content.' } } },
)

export const Footer = atom(
  'Footer',
  688,
  (_combo, index) => (
    <Calendar.Footer {...target(index)}>
      <div className="flex gap-xs" {...slot('actions')}>
        <Button {...part('Button', { variant: 'outline' })} variant="outline" {...text('label')}>
          Today
        </Button>
      </div>
    </Calendar.Footer>
  ),
  { slots: { actions: { description: 'Any actions below the calendar.', preferred: ['Button'] } } },
)

export const Panel = atom(
  'Panel',
  689,
  (combo, index) => (
    <Calendar.Panel {...target(index)} variant={combo.variant as CalendarPanelProps['variant']}>
      <div className="flex flex-col gap-xs" {...slot('content')}>
        <div {...ref('Picker')}>
          <div {...slot('content')}>
            <Calendar.Picker
              month={month}
              today={month}
              animate={false}
              fixedWeeks
              components={pickerParts}
            />
          </div>
        </div>
      </div>
    </Calendar.Panel>
  ),
  {
    cva: { file: 'src/components/calendar/calendar.types.ts', name: 'calendarPanelVariants' },
    slots: {
      content: {
        description: 'Calendar picker and optional supporting content.',
        preferred: ['Calendar/Picker', 'Calendar/Header', 'Calendar/Footer'],
      },
    },
  },
)

export const Root: Story = {
  parameters: {
    figma: {
      component: 'Calendar',
      group: 'Calendar',
      order: 690,
      description:
        'Calendar is a state provider in React. This Figma composition arranges its Header, Panel and Footer in an editable content slot.',
      slots: {
        content: {
          description: 'Calendar sections.',
          preferred: ['Calendar/Header', 'Calendar/Panel', 'Calendar/Footer'],
        },
      },
    } satisfies FigmaSpec,
  },
  render: () => (
    <Matrix
      render={(_combo, index) => (
        <Calendar defaultState={{ selectedDates: selected }}>
          <div {...target(index)}>
            <div className="flex flex-col gap-sm" {...slot('content')}>
              <Calendar.Header {...ref('Header')}>
                <div {...slot('content')}>
                  <Calendar.Summary {...ref('Summary')} />
                </div>
              </Calendar.Header>
              <Calendar.Panel {...ref('Panel')}>
                <div className="flex flex-col gap-xs" {...slot('content')}>
                  <div {...ref('Picker')}>
                    <div {...slot('content')}>
                      <Calendar.Picker
                        month={month}
                        today={month}
                        animate={false}
                        fixedWeeks
                        components={pickerParts}
                      />
                    </div>
                  </div>
                </div>
              </Calendar.Panel>
              <Calendar.Footer {...ref('Footer')}>
                <div className="flex gap-xs" {...slot('actions')}>
                  <Button
                    variant="outline"
                    {...part('Button', { variant: 'outline' })}
                    {...text('label')}
                  >
                    Today
                  </Button>
                </div>
              </Calendar.Footer>
            </div>
          </div>
        </Calendar>
      )}
    />
  ),
}
