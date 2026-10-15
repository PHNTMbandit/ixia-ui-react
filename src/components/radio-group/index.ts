import { Radio } from './radio'
import { RadioGroup as RadioGroupRoot } from './radio-group'

const RadioGroup = Object.assign(RadioGroupRoot, {
  Radio,
})

export type { RadioGroupProps, RadioProps } from './radio-group.types'
export { Radio } from './radio'

export { RadioGroup }
