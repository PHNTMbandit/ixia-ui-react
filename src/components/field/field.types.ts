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

type FieldDescriptionProps = React.ComponentProps<'p'>
type FieldErrorProps = React.ComponentProps<'ul'>
type FieldInputGroupProps = React.ComponentProps<typeof InputGroup>
type FieldInputGroupInputProps = React.ComponentProps<typeof InputGroupInput>
type FieldInputProps = React.ComponentProps<typeof Input>
type FieldLabelProps = React.ComponentProps<'div'> &
  VariantProps<typeof fieldLabelVariants> & {
    showRequired?: boolean
  }
type FieldSelectProps = React.ComponentProps<typeof Select>
type FieldSliderProps = React.ComponentProps<typeof Slider>
type FieldTextAreaProps = React.ComponentProps<typeof TextArea>
type FieldCheckboxProps = React.ComponentProps<typeof Checkbox>
type FieldRadioProps = React.ComponentProps<typeof Radio>
type FieldRadioGroupProps = React.ComponentProps<typeof RadioGroup>
type FieldSwitchProps = React.ComponentProps<typeof Switch>
type FieldToggleProps = React.ComponentProps<typeof Toggle>
type FieldProps = React.ComponentProps<'div'>
type FieldSetProps = React.ComponentProps<'div'>
type FieldRowProps = React.ComponentProps<'div'>

export const fieldLabelVariants = cva('whitespace-nowrap', {
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
})

export type {
  FieldDescriptionProps,
  FieldErrorProps,
  FieldInputGroupProps,
  FieldInputGroupInputProps,
  FieldInputProps,
  FieldLabelProps,
  FieldSelectProps,
  FieldSliderProps,
  FieldTextAreaProps,
  FieldCheckboxProps,
  FieldRadioProps,
  FieldRadioGroupProps,
  FieldSwitchProps,
  FieldToggleProps,
  FieldProps,
  FieldSetProps,
  FieldRowProps,
}
