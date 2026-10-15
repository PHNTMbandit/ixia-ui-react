import { Combobox as BaseCombobox } from '@base-ui/react/combobox'

import type { ComboboxCollectionProps } from './combobox.types'

export function ComboboxCollection({ ...props }: ComboboxCollectionProps) {
  return <BaseCombobox.Collection {...props} />
}
