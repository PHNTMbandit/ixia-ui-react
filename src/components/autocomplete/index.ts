import { Autocomplete as AutocompleteRoot } from './autocomplete'
import { AutocompleteCollection } from './autocomplete-collection'
import { AutocompleteContent } from './autocomplete-content'
import { AutocompleteGridContent } from './autocomplete-grid-content'
import { AutocompleteGridItem } from './autocomplete-grid-item'
import { AutocompleteGroup } from './autocomplete-group'
import { AutocompleteGroupLabel } from './autocomplete-group-label'
import { AutocompleteInputGroup } from './autocomplete-input-group'
import { AutocompleteInputGroupAddon } from './autocomplete-input-group-addon'
import { AutocompleteInputGroupInput } from './autocomplete-input-group-input'
import { AutocompleteItem } from './autocomplete-item'
import { AutocompleteRow } from './autocomplete-row'
import { AutocompleteStatus } from './autocomplete-status'
import { AutocompleteTrigger } from './autocomplete-trigger'

const Autocomplete = Object.assign(AutocompleteRoot, {
  Collection: AutocompleteCollection,
  Content: AutocompleteContent,
  GridContent: AutocompleteGridContent,
  GridItem: AutocompleteGridItem,
  Group: AutocompleteGroup,
  GroupLabel: AutocompleteGroupLabel,
  InputGroup: AutocompleteInputGroup,
  InputGroupAddon: AutocompleteInputGroupAddon,
  InputGroupInput: AutocompleteInputGroupInput,
  Item: AutocompleteItem,
  Row: AutocompleteRow,
  Status: AutocompleteStatus,
  Trigger: AutocompleteTrigger,
})

export type {
  AutocompleteCollectionProps,
  AutocompleteContentProps,
  AutocompleteGridContentProps,
  AutocompleteGridItemProps,
  AutocompleteGroupLabelProps,
  AutocompleteGroupProps,
  AutocompleteInputGroupAddonProps,
  AutocompleteInputGroupInputProps,
  AutocompleteInputGroupProps,
  AutocompleteItemProps,
  AutocompleteProps,
  AutocompleteRowProps,
  AutocompleteStatusProps,
  AutocompleteTriggerProps,
} from './autocomplete.types'
export { AutocompleteCollection } from './autocomplete-collection'
export { AutocompleteContent } from './autocomplete-content'
export { AutocompleteGridContent } from './autocomplete-grid-content'
export { AutocompleteGridItem } from './autocomplete-grid-item'
export { AutocompleteGroup } from './autocomplete-group'
export { AutocompleteGroupLabel } from './autocomplete-group-label'
export { AutocompleteInputGroup } from './autocomplete-input-group'
export { AutocompleteInputGroupAddon } from './autocomplete-input-group-addon'
export { AutocompleteInputGroupInput } from './autocomplete-input-group-input'
export { AutocompleteItem } from './autocomplete-item'
export { AutocompleteRow } from './autocomplete-row'
export { AutocompleteStatus } from './autocomplete-status'
export { AutocompleteTrigger } from './autocomplete-trigger'

export { Autocomplete }
