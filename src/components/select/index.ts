import { Select as SelectRoot } from './select'
import { SelectDescription } from './select-description'
import { SelectGroup } from './select-group'
import { SelectGroupLabel } from './select-group-label'
import { SelectIcon } from './select-icon'
import { SelectItem } from './select-item'
import { SelectList } from './select-list'
import { SelectPopup } from './select-popup'
import { SelectTitle } from './select-title'
import { SelectTrigger } from './select-trigger'
import { SelectValue } from './select-value'

const Select = Object.assign(SelectRoot, {
  Description: SelectDescription,
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel,
  Icon: SelectIcon,
  Item: SelectItem,
  List: SelectList,
  Popup: SelectPopup,
  Title: SelectTitle,
  Trigger: SelectTrigger,
  Value: SelectValue,
})

export type {
  SelectIconProps,
  SelectItemProps,
  SelectListProps,
  SelectPopupProps,
  SelectProps,
  SelectTriggerProps,
  SelectValueProps,
  SelectGroupProps,
  SelectGroupLabelProps,
  SelectDescriptionProps,
  SelectTitleProps,
} from './select.types'
export { SelectItem } from './select-item'
export { SelectList } from './select-list'
export { SelectIcon } from './select-icon'
export { SelectPopup } from './select-popup'
export { SelectTrigger } from './select-trigger'
export { SelectValue } from './select-value'
export { SelectGroup } from './select-group'
export { SelectGroupLabel } from './select-group-label'
export { SelectDescription } from './select-description'
export { SelectTitle } from './select-title'

export { Select }
