import { Popover as PopoverRoot } from './popover'
import { PopoverButton } from './popover-button'
import { PopoverContent } from './popover-content'
import { PopoverDescription } from './popover-description'
import { PopoverHeader } from './popover-header'
import { PopoverPanel } from './popover-panel'
import { PopoverTitle } from './popover-title'
import { PopoverTrigger } from './popover-trigger'

const Popover = Object.assign(PopoverRoot, {
  Button: PopoverButton,
  Content: PopoverContent,
  Description: PopoverDescription,
  Header: PopoverHeader,
  Panel: PopoverPanel,
  Title: PopoverTitle,
  Trigger: PopoverTrigger,
})

export type {
  PopoverButtonProps,
  PopoverContentProps,
  PopoverDescriptionProps,
  PopoverHeaderProps,
  PopoverPanelProps,
  PopoverProps,
  PopoverTitleProps,
  PopoverTriggerProps,
} from './popover.types'
export { PopoverButton } from './popover-button'
export { PopoverDescription } from './popover-description'
export { PopoverPanel } from './popover-panel'
export { PopoverTitle } from './popover-title'
export { PopoverTrigger } from './popover-trigger'
export { PopoverHeader } from './popover-header'
export { PopoverContent } from './popover-content'
export { popoverHandle } from './popover.types'

export { Popover }
