import { Combobox as BaseCombobox } from '@base-ui/react/combobox'

import type { ComboboxProps } from './combobox.types'

export function Combobox({ ...props }: ComboboxProps) {
  return <BaseCombobox.Root {...props} />
}
