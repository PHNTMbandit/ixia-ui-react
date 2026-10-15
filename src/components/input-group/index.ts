import { InputGroup as InputGroupRoot } from './input-group'
import { InputGroupAddon } from './input-group-addon'
import { InputGroupInput } from './input-group-input'
import { InputGroupSeparator } from './input-group-separator'

const InputGroup = Object.assign(InputGroupRoot, {
  Addon: InputGroupAddon,
  Input: InputGroupInput,
  Separator: InputGroupSeparator,
})

export type {
  InputGroupAddonProps,
  InputGroupInputProps,
  InputGroupProps,
  InputGroupSeparatorProps,
} from './input-group.types'
export { InputGroupAddon } from './input-group-addon'
export { InputGroupInput } from './input-group-input'
export { InputGroupSeparator } from './input-group-separator'

export { InputGroup }
