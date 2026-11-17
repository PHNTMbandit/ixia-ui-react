# Calendar

> Generated from Ixia public exports and Storybook descriptions. Run `vp run docs:llms` to update.

A calendar component that allows users to select dates and view events. It is built using the DayPicker library and can be customized with various props. Navigation and dropdown icons use the Phosphor defaults. Replace them for every component with IconProvider, or compose your own icons as children of CalendarDropdown, CalendarNextMonthButton, and CalendarPreviousMonthButton passed through the components prop (define those wrappers outside render to preserve component identity). Default day button labels include the displayed day followed by the full date and selection context; custom labels can be supplied through the labels prop.

## Import

```tsx
import { Calendar } from 'ixia-ui-react/calendar'
```

## Selected Storybook controls

These controls are a partial guide and may include example-specific values. Storybook-reported defaults can differ from component defaults; see the TypeScript types and implementation for the complete API.

- `mode`: Options: `single`, `multiple`, `range`.
- `variant`: Options: `elevated`, `ghost`, `outline`.

## Runtime exports

- `CalendarPicker`
- `CalendarFooter`
- `CalendarHeader`
- `CalendarPanel`
- `CalendarSummary`
- `CalendarDayButton`
- `CalendarChevron`
- `CalendarNextMonthButton`
- `CalendarPreviousMonthButton`
- `CalendarDropdown`
- `Calendar`

## Type exports

- `CalendarAction`
- `CalendarContextValue`
- `CalendarProps`
- `CalendarFooterProps`
- `CalendarHeaderProps`
- `CalendarPanelProps`
- `CalendarPickerProps`
- `CalendarSummaryProps`
- `CalendarDayButtonProps`
- `CalendarChevronProps`
- `CalendarNextMonthButtonProps`
- `CalendarPreviousMonthButtonProps`
- `CalendarDropdownProps`
- `CalendarComponents`

## Compound parts

### Calendar

- `Calendar.Chevron`
- `Calendar.DayButton`
- `Calendar.Dropdown`
- `Calendar.Footer`
- `Calendar.Header`
- `Calendar.NextMonthButton`
- `Calendar.Panel`
- `Calendar.Picker`
- `Calendar.PreviousMonthButton`
- `Calendar.Summary`

## Optional peer dependencies

`@daypicker/react`

## Further reading

- [Public entry point on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/calendar/index.ts)
- [Storybook examples on GitHub (main branch)](https://github.com/PHNTMbandit/ixia-ui-react/blob/main/src/components/calendar/calendar.stories.tsx)
- [Getting started](../guides/getting-started.md)
