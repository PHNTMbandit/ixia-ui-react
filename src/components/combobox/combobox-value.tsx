import { Combobox as BaseCombobox } from '@base-ui/react/combobox'

import type { ComboboxValueProps } from './combobox.types'

export function ComboboxValue({ ...props }: ComboboxValueProps) {
  return <BaseCombobox.Value {...props} />
}
