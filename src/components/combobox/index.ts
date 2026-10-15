import { Combobox as ComboboxRoot } from './combobox'
import { ComboboxChip } from './combobox-chip'
import { ComboboxChips } from './combobox-chips'
import { ComboboxCollection } from './combobox-collection'
import { ComboboxEmpty } from './combobox-empty'
import { ComboboxGroup } from './combobox-group'
import { ComboboxGroupLabel } from './combobox-group-label'
import { ComboboxInput } from './combobox-input'
import { ComboboxItem } from './combobox-item'
import { ComboboxList } from './combobox-list'
import { ComboboxPopup } from './combobox-popup'
import { ComboboxStatus } from './combobox-status'
import { ComboboxTrigger } from './combobox-trigger'
import { ComboboxValue } from './combobox-value'
import { ComboboxVirtualizedList } from './combobox-virtualized-list'

const Combobox = Object.assign(ComboboxRoot, {
  Chip: ComboboxChip,
  Chips: ComboboxChips,
  Collection: ComboboxCollection,
  Empty: ComboboxEmpty,
  Group: ComboboxGroup,
  GroupLabel: ComboboxGroupLabel,
  Input: ComboboxInput,
  Item: ComboboxItem,
  List: ComboboxList,
  Popup: ComboboxPopup,
  Status: ComboboxStatus,
  Trigger: ComboboxTrigger,
  Value: ComboboxValue,
  VirtualizedList: ComboboxVirtualizedList,
})

export type {
  ComboboxChipProps,
  ComboboxChipsProps,
  ComboboxCollectionProps,
  ComboboxEmptyProps,
  ComboboxGroupLabelProps,
  ComboboxGroupProps,
  ComboboxInputProps,
  ComboboxItemProps,
  ComboboxListProps,
  ComboboxPopupProps,
  ComboboxProps,
  ComboboxStatusProps,
  ComboboxTriggerProps,
  ComboboxValueProps,
  ComboboxVirtualizedListProps,
} from './combobox.types'
export { ComboboxChip } from './combobox-chip'
export { ComboboxChips } from './combobox-chips'
export { ComboboxCollection } from './combobox-collection'
export { ComboboxEmpty } from './combobox-empty'
export { ComboboxGroup } from './combobox-group'
export { ComboboxGroupLabel } from './combobox-group-label'
export { ComboboxInput } from './combobox-input'
export { ComboboxItem } from './combobox-item'
export { ComboboxList } from './combobox-list'
export { ComboboxPopup } from './combobox-popup'
export { ComboboxStatus } from './combobox-status'
export { ComboboxTrigger } from './combobox-trigger'
export { ComboboxValue } from './combobox-value'
export { ComboboxVirtualizedList } from './combobox-virtualized-list'
export { useFilter, useFilteredItems } from './combobox.types'

export { Combobox }
