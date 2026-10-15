import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu'

import { cn } from '@/utils/cn'

import type { ContextMenuRadioGroupProps } from './context-menu.types'

export function ContextMenuRadioGroup({ className, ref, ...props }: ContextMenuRadioGroupProps) {
  return <BaseContextMenu.RadioGroup className={cn('', className)} ref={ref} {...props} />
}
