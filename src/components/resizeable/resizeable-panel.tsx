import { Panel as BaseResizablePanel } from 'react-resizable-panels'

import { cn } from '@/utils/cn'

import type { ResizeablePanelProps } from './resizeable.types'

export function ResizeablePanel({ className, ...props }: ResizeablePanelProps) {
  return <BaseResizablePanel className={cn('', className)} data-slot="resizable-panel" {...props} />
}
