import { Field as FieldRoot } from './field'
import { FieldCheckbox } from './field-checkbox'
import { FieldContent } from './field-content'
import { FieldDescription } from './field-description'
import { FieldErrors } from './field-errors'
import { FieldGroup } from './field-group'
import { FieldInput } from './field-input'
import { FieldInputGroup } from './field-input-group'
import { FieldInputGroupInput } from './field-input-group-input'
import { FieldLabel } from './field-label'
import { FieldLegend } from './field-legend'
import { FieldRadio } from './field-radio'
import { FieldRadioGroup } from './field-radio-group'
import { FieldSelect } from './field-select'
import { FieldSeparator } from './field-separator'
import { FieldSet } from './field-set'
import { FieldSlider } from './field-slider'
import { FieldSwitch } from './field-switch'
import { FieldTextArea } from './field-text-area'
import { FieldToggle } from './field-toggle'

const Field = Object.assign(FieldRoot, {
  Checkbox: FieldCheckbox,
  Content: FieldContent,
  Description: FieldDescription,
  Errors: FieldErrors,
  Group: FieldGroup,
  Input: FieldInput,
  InputGroup: FieldInputGroup,
  InputGroupInput: FieldInputGroupInput,
  Label: FieldLabel,
  Legend: FieldLegend,
  Radio: FieldRadio,
  RadioGroup: FieldRadioGroup,
  Select: FieldSelect,
  Separator: FieldSeparator,
  Set: FieldSet,
  Slider: FieldSlider,
  Switch: FieldSwitch,
  TextArea: FieldTextArea,
  Toggle: FieldToggle,
})

export type {
  FieldCheckboxProps,
  FieldContentProps,
  FieldDescriptionProps,
  FieldErrorProps,
  FieldGroupProps,
  FieldInputGroupInputProps,
  FieldInputGroupProps,
  FieldInputProps,
  FieldLabelProps,
  FieldLegendProps,
  FieldProps,
  FieldRadioGroupProps,
  FieldRadioProps,
  FieldSelectProps,
  FieldSeparatorProps,
  FieldSetProps,
  FieldSliderProps,
  FieldSwitchProps,
  FieldTextAreaProps,
  FieldToggleProps,
} from './field.types'
export { fieldVariants, fieldLabelVariants, fieldLegendVariants } from './field.types'
export { FieldContent } from './field-content'
export { FieldDescription } from './field-description'
export { FieldErrors } from './field-errors'
export { FieldGroup } from './field-group'
export { FieldInput } from './field-input'
export { FieldLabel } from './field-label'
export { FieldLegend } from './field-legend'
export { FieldSeparator } from './field-separator'
export { FieldSet } from './field-set'
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

export { Field }
