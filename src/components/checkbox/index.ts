import { Checkbox as CheckboxRoot } from './checkbox'
import { CheckboxIndicator } from './checkbox-indicator'

const Checkbox = Object.assign(CheckboxRoot, {
  Indicator: CheckboxIndicator,
})

export type { CheckboxIndicatorProps, CheckboxRootProps } from './checkbox.types'
export { CheckboxIndicator } from './checkbox-indicator'

export { Checkbox }
