import { Group as BaseResizableGroup } from 'react-resizable-panels'

import { cn } from '@/utils/cn'

import type { ResizeablePanelGroupProps } from './resizeable.types'

export function ResizeablePanelGroup({ className, ...props }: ResizeablePanelGroupProps) {
  return (
    <BaseResizableGroup
      className={cn('flex h-full aria-[orientation=vertical]:flex-col', className)}
      data-slot="resizable-panel-group"
      {...props}
    />
  )
}
