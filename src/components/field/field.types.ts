import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

import type { Checkbox } from '../checkbox'
import type { Input } from '../input'
import type { InputGroup, InputGroupInput } from '../input-group'
import type { Radio, RadioGroup } from '../radio-group'
import type { Select } from '../select'
import type { Slider } from '../slider'
import type { Switch } from '../switch'
import type { TextArea } from '../text-area'
import type { Toggle } from '../toggle'

type FieldContentProps = React.ComponentProps<'div'>
type FieldDescriptionProps = React.ComponentProps<'p'>
type FieldErrorProps = React.ComponentProps<'ul'>
type FieldInputGroupProps = React.ComponentProps<typeof InputGroup>
type FieldInputGroupInputProps = React.ComponentProps<typeof InputGroupInput>
type FieldInputProps = React.ComponentProps<typeof Input>
type FieldLabelProps = React.ComponentProps<'label'> &
  VariantProps<typeof fieldLabelVariants> & {
    showRequired?: boolean
  }
type FieldLegendProps = React.ComponentProps<'legend'> & VariantProps<typeof fieldLegendVariants>
type FieldSelectProps = React.ComponentProps<typeof Select>
type FieldSeparatorProps = React.ComponentProps<'hr'>
type FieldSetProps = React.ComponentProps<'fieldset'>
type FieldSliderProps = React.ComponentProps<typeof Slider>
type FieldTextAreaProps = React.ComponentProps<typeof TextArea>
type FieldCheckboxProps = React.ComponentProps<typeof Checkbox>
type FieldRadioProps = React.ComponentProps<typeof Radio>
type FieldRadioGroupProps = React.ComponentProps<typeof RadioGroup>
type FieldSwitchProps = React.ComponentProps<typeof Switch>
type FieldToggleProps = React.ComponentProps<typeof Toggle>
type FieldProps = React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>
type FieldGroupProps = React.ComponentProps<'div'>

const fieldVariants = cva('', {
    defaultVariants: {
      orientation: 'vertical',
    },
    variants: {
      orientation: {
        horizontal:
          'grid grid-cols-[var(--ixia-field-label-width,auto)_minmax(0,1fr)] items-center gap-x-sm gap-y-2xs *:col-start-2 *:first:col-start-1',
        responsive:
          'flex flex-col gap-2xs @md:grid @md:grid-cols-[var(--ixia-field-label-width,auto)_minmax(0,1fr)] @md:items-center @md:gap-x-sm @md:gap-y-2xs @md:*:col-start-2 @md:*:first:col-start-1',
        vertical: 'flex flex-col gap-2xs',
      },
    },
  }),
  fieldLabelVariants = cva('whitespace-nowrap', {
    defaultVariants: {
      size: 'medium',
      variant: 'primary',
    },
    variants: {
      size: {
        large: 'style-text-default-1',
        medium: 'style-text-default-0',
        small: 'style-text-default--1',
      },
      variant: {
        primary: 'text-on-surface',
        secondary: 'text-on-surface-variant',
      },
    },
  }),
  fieldLegendVariants = cva('float-left w-full', {
    defaultVariants: {
      size: 'medium',
    },
    variants: {
      size: {
        large: 'style-text-strong-2',
        medium: 'style-text-strong-1',
        small: 'style-text-strong-0',
      },
    },
  })

export { fieldVariants, fieldLabelVariants, fieldLegendVariants }

export type {
  FieldContentProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldInputGroupProps,
  FieldInputGroupInputProps,
  FieldInputProps,
  FieldLabelProps,
  FieldLegendProps,
  FieldSelectProps,
  FieldSeparatorProps,
  FieldSetProps,
  FieldSliderProps,
  FieldTextAreaProps,
  FieldCheckboxProps,
  FieldRadioProps,
  FieldRadioGroupProps,
  FieldSwitchProps,
  FieldToggleProps,
  FieldProps,
  FieldGroupProps,
}
