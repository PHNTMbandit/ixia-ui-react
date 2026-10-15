import { Select as BaseSelect } from '@base-ui/react/select'

import type { SelectProps } from './select.types'

export function Select<Value, Multiple extends boolean | undefined = false>(
  props: SelectProps<Value, Multiple>,
) {
  return <BaseSelect.Root {...props} />
}
