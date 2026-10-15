import { Field as FieldRoot } from './field'
import { FieldCheckbox } from './field-checkbox'
import { FieldDescription } from './field-description'
import { FieldErrors } from './field-errors'
import { FieldInput } from './field-input'
import { FieldInputGroup } from './field-input-group'
import { FieldInputGroupInput } from './field-input-group-input'
import { FieldLabel } from './field-label'
import { FieldRadio } from './field-radio'
import { FieldRadioGroup } from './field-radio-group'
import { FieldRow } from './field-row'
import { FieldSelect } from './field-select'
import { FieldSet } from './field-set'
import { FieldSlider } from './field-slider'
import { FieldSwitch } from './field-switch'
import { FieldTextArea } from './field-text-area'
import { FieldToggle } from './field-toggle'

const Field = Object.assign(FieldRoot, {
  Checkbox: FieldCheckbox,
  Description: FieldDescription,
  Errors: FieldErrors,
  Input: FieldInput,
  InputGroup: FieldInputGroup,
  InputGroupInput: FieldInputGroupInput,
  Label: FieldLabel,
  Radio: FieldRadio,
  RadioGroup: FieldRadioGroup,
  Row: FieldRow,
  Select: FieldSelect,
  Set: FieldSet,
  Slider: FieldSlider,
  Switch: FieldSwitch,
  TextArea: FieldTextArea,
  Toggle: FieldToggle,
})

export type {
  FieldDescriptionProps,
  FieldErrorProps,
  FieldInputProps,
  FieldLabelProps,
  FieldProps,
  FieldSelectProps,
  FieldSliderProps,
  FieldTextAreaProps,
  FieldCheckboxProps,
  FieldRadioProps,
  FieldRadioGroupProps,
  FieldSwitchProps,
  FieldToggleProps,
  FieldInputGroupInputProps,
  FieldInputGroupProps,
  FieldSetProps,
  FieldRowProps,
} from './field.types'
export { FieldDescription } from './field-description'
export { FieldErrors } from './field-errors'
export { FieldInput } from './field-input'
export { FieldLabel } from './field-label'
export { FieldSlider } from './field-slider'
export { FieldSelect } from './field-select'
export { FieldTextArea } from './field-text-area'
export { FieldCheckbox } from './field-checkbox'
export { FieldRadio } from './field-radio'
export { FieldRadioGroup } from './field-radio-group'
export { FieldSwitch } from './field-switch'
export { FieldToggle } from './field-toggle'
export { FieldInputGroup } from './field-input-group'
export { FieldInputGroupInput } from './field-input-group-input'
export { FieldSet } from './field-set'
export { FieldRow } from './field-row'

export { Field }
