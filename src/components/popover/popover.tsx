import { Popover as BasePopover } from '@base-ui/react/popover'

import type { PopoverProps } from './popover.types'

export function Popover({ ...props }: PopoverProps) {
  return <BasePopover.Root {...props} />
}
